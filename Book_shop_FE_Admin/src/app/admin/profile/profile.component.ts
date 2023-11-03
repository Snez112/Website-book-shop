import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/common/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { PageService } from 'src/app/services/page.service';
import { SessionService } from 'src/app/services/session.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customer!: Customer;
  id!:number

  postForm: FormGroup;

  selectFile!: File;
  url: string = 'https://res.cloudinary.com/veggie-shop/image/upload/v1633795994/users/mnoryxp056ohm0b4gcrj.png';
  image: string = this.url;

  @Output()
  editFinish: EventEmitter<any> = new EventEmitter<any>();

  constructor(private pageService: PageService, private customerService: CustomerService, private toastr: ToastrService, private sessionService: SessionService, 
    private modalService: NgbModal, private uploadService: UploadService) {
    this.postForm = new FormGroup({
      'userId': new FormControl(0),
      'email': new FormControl(null, [Validators.minLength(4), Validators.email, Validators.required]),
      'name': new FormControl(null, [Validators.minLength(4), Validators.required]),
      'password': new FormControl(null, [Validators.minLength(6), Validators.required]),
      'address': new FormControl(null, [Validators.minLength(4), Validators.required, Validators.pattern('(0)[0-9]{9}')]),
      'phone': new FormControl(null, [Validators.minLength(4), Validators.required]),
      'gender': new FormControl(true),
      'registerDate': new FormControl(new Date()),
      'status': new FormControl(1),
      'token': new FormControl(null),
    })
   }

  ngOnInit(): void {
    this.pageService.setPageActive('profile');
    this.getCustomer();
  }

  update() {
    if(this.postForm.valid) {
      this.customer = this.postForm.value;
      this.customer.image = this.image;
      this.customerService.updateAdmin(this.customer.userId, this.customer).subscribe(data=>{
        this.toastr.success('Cập nhật thành công!', 'Hệ thống');
        this.editFinish.emit('done');        
      })      
    } else {
      this.toastr.error('Hãy kiểm tra lại dữ liệu! ', 'Hệ thống');
    }
    this.modalService.dismissAll();
  }

  getCustomer() {
    let email = this.sessionService.getUser();
    this.customerService.getByEmail(email).subscribe(data => {
      this.customer = data as Customer;
      this.postForm = new FormGroup({
        'userId': new FormControl(this.customer.userId),
        'email': new FormControl(this.customer.email, [Validators.minLength(4), Validators.email, Validators.required]),
        'name': new FormControl(this.customer.name, [Validators.minLength(4), Validators.required]),
        'password': new FormControl(this.customer.password, [Validators.minLength(6), Validators.required]),
        'address': new FormControl(this.customer.address, [Validators.minLength(4), Validators.required]),
        'phone': new FormControl(this.customer.phone, [Validators.minLength(4), Validators.required, Validators.pattern('(0)[0-9]{9}')]),
        'gender': new FormControl(this.customer.gender),
        'registerDate': new FormControl(this.customer.registerDate),
        'status': new FormControl(1),
        'token': new FormControl(this.customer.token),
      })
      
      this.image = this.customer.image;
    }, error => {
      this.toastr.error('Lỗi truy xuất dữ liệu! ', 'Hệ thống');
    })
  }

  onFileSelect(event: any) {
    this.selectFile = event.target.files[0];
    this.uploadService.uploadCustomer(this.selectFile).subscribe(response => {
      if (response) {
        this.image = response.secure_url;
      }
    })
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

}
