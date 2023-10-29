import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChatMessage } from '../common/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  chatMessages: ChatMessage[] = [];

  constructor(private toastr: ToastrService) { }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/notification');

    this.webSocket.onopen = (event) => {
      // console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      let mess: ChatMessage = chatMessageDto as ChatMessage;
      this.toastr.info('Khách hàng '+mess.user+' đã đặt 1 đơn hàng!', 'Hệ thống');
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      // console.log('Close: ', event);
    };
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
