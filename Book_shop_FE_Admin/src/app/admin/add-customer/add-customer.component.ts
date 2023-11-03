import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/common/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customer!: Customer;

  @Output()
  saveFinish: EventEmitter<any> = new EventEmitter<any>();

  selectFile!: File;
  url: string = 'https://res.cloudinary.com/veggie-shop/image/upload/v1633795994/users/mnoryxp056ohm0b4gcrj.png';
  image: string = this.url;

  postForm: FormGroup;

  constructor(private modalService: NgbModal, private customerService: CustomerService, private toastr: ToastrService, private uploadService: UploadService) {
    this.postForm = new FormGroup({
      'userId': new FormControl(0),
      'email': new FormControl(null, [Validators.minLength(4), Validators.email, Validators.required]),
      'name': new FormControl(null, [Validators.minLength(4), Validators.required]),
      'password': new FormControl(null, [Validators.minLength(6), Validators.required]),
      'address': new FormControl(null, [Validators.minLength(4), Validators.required]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern('(0)[0-9]{9}')]),
      'gender': new FormControl(true),
      'registerDate': new FormControl(new Date()),
      'status': new FormControl(1),
    })
  }

  ngOnInit(): void {
  }

  save() {
    if (this.postForm.valid) {
      this.customer = this.postForm.value;
      this.customer.image = this.image;
      this.customerService.post(this.customer).subscribe(data => {
        this.toastr.success('Thêm thành công', 'Hệ thống');
        this.modalService.dismissAll();
        this.saveFinish.emit('done');
      }, error => {
        if (error.status === 404) {
          this.toastr.error('Email này đã tồn tại! ', 'Hệ thống');
        } else {
          this.toastr.error('Thêm thất bại!', 'Hệ thống');
        }
      })
    } else {
      this.toastr.error('Thêm thất bại!', 'Hệ thống');
    }
    this.postForm = new FormGroup({
      'userId': new FormControl(0),
      'email': new FormControl(null, [Validators.minLength(4), Validators.email, Validators.required]),
      'name': new FormControl(null, [Validators.minLength(4), Validators.required]),
      'password': new FormControl(null, [Validators.minLength(6), Validators.required]),
      'address': new FormControl(null, [Validators.minLength(4), Validators.required]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern('(0)[0-9]{9}')]),
      'gender': new FormControl(true),
      'registerDate': new FormControl(new Date()),
      'status': new FormControl(1),
    })
    this.image = this.url;
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  onFileSelect(event: any) {
    this.selectFile = event.target.files[0];
    this.uploadService.uploadCustomer(this.selectFile).subscribe(response => {
      if (response) {
        this.image = response.secure_url;
      }
    })
  }

}
