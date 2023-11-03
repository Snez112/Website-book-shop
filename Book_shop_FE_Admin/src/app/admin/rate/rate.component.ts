import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Rate } from 'src/app/common/Rate';
import { PageService } from 'src/app/services/page.service';
import { RateService } from 'src/app/services/rate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  rates!: Rate[];
  listData!: MatTableDataSource<Rate>;
  ratesLength!: number;
  columns: string[] = ['index', 'name', 'product', 'rating', 'comment', 'rateDate', 'delete'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pageService: PageService, private rateService: RateService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.pageService.setPageActive('rate');
    this.getAll();
  }

  getAll() {
    this.rateService.getAll().subscribe(data => {
      this.rates = data as Rate[];
      this.listData = new MatTableDataSource(this.rates);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.ratesLength = this.rates.length;
    }, error => {
      this.toastr.error('Lỗi! ' + error.status, 'Hệ thống');
    })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Bạn muốn xoá đánh giá này ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rateService.delete(id).subscribe(data => {
          this.ngOnInit();
          this.toastr.success('Xoá thành công!', 'Hệ thống');
        }, error => {
          this.toastr.error('Xoá thất bại, đã xảy ra lỗi!' + error.status, 'Hệ thống');
        })
      }
    })
  }


  search(event: any) {
    const fValue = (event.target as HTMLInputElement).value;
    this.rateService.getAll().subscribe(data => {
      this.rates = data as Rate[];
      this.rates = this.rates.filter(r => r.user.name.toLowerCase().includes(fValue.toLowerCase()) || r.product.name.toLowerCase().includes(fValue.toLowerCase()) || r.comment.toLowerCase().includes(fValue.toLowerCase()));
      this.listData = new MatTableDataSource(this.rates);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.ratesLength = this.rates.length;
    })
  }

}
