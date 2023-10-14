import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/common/Category';
import { CategoryService } from 'src/app/services/category.service';
import { PageService } from 'src/app/services/page.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  listData!: MatTableDataSource<Category>;
  categories!: Category[];
  categoriesLength!: number;
  columns: string[] = ['categoryId', 'categoryName', 'view', 'delete'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pageService: PageService, private toastr: ToastrService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.pageService.setPageActive('category');
    this.getAll();
  }

  getAll() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
      this.listData = new MatTableDataSource(this.categories);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.categoriesLength = this.categories.length;
    }, error => {
      console.log('loi' + error);
    })
  }

  finish() {
    this.ngOnInit();
  }

  delete(id: number, name: string) {
    Swal.fire({
      title: 'Bạn muốn xoá nhãn hàng có tên ' + name + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(id).subscribe(data => {
          this.ngOnInit();
          this.toastr.success('Thông báo xoá thành công!', 'Hệ thống');
        }, error => {
          this.toastr.error('Thông báo xoá thất bại, đã xảy ra lỗi!', 'Hệ thống');
        })
      }
    })
  }

  search(event: any) {
    const fValue = (event.target as HTMLInputElement).value;
    this.listData.filter = fValue.trim().trim().toLowerCase();
  }

}
