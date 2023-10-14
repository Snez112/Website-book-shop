import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatMessage } from 'src/app/common/ChatMessage';
import { Customer } from 'src/app/common/Customer';
import { Notification } from 'src/app/common/Notification';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: Customer;
  image!: string;
  name!: string;

  notifications!: Notification[];

  webSocket!: WebSocket;
  chatMessages: ChatMessage[] = [];

  constructor(private sessionService: SessionService, private router: Router, private customerService: CustomerService,
    private toastr: ToastrService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.openWebSocket();
    this.getUser();
    this.getAllNotification()
  }
  
  getUser() {
    let email = this.sessionService.getUser();
    this.customerService.getByEmail(email).subscribe(data => {
      this.user = data as Customer;
      this.name = this.user.name;
      this.image = this.user.image;
    }, error => {
      this.toastr.error('Đã xảy ra lỗi', 'Hệ thống');
      this.sessionService.signOut();
      this.router.navigate(['/login']);
    })
  }

  getAllNotification() {
    this.notificationService.get().subscribe(data => {
      this.notifications = data as Notification[];
    })
  }

  getNotificationFalse(): number{
    let count = 0;
    for (const item of this.notifications) {
      if(!item.status) {
        count++;
      }
    }
    return count;
  }
  
  readed(id: number) {
    this.notificationService.readed(id).subscribe(data=>{
      this.getAllNotification();
    })
  }

  readAll() {
    for (const i of this.notifications) {
      this.notificationService.readed(i.id).subscribe(data=>{        
      })
    }
    this.getAllNotification();
  }
  logOut() {
    this.sessionService.signOut();
    this.router.navigate(['/login']);
  }

  finish() {
    this.ngOnInit();
  }

  openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/notification');

    this.webSocket.onopen = (event) => {
      // console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      let mess: ChatMessage = chatMessageDto as ChatMessage;
      this.toastr.info('Khách hàng '+mess.user+' '+mess.message, 'Hệ thống');
      this.getAllNotification();
      this.getNotificationFalse();
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      // console.log('Close: ', event);
    };
  }

  closeWebSocket() {
    this.webSocket.close();
  }

}
