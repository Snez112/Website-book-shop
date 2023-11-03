import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { Product } from 'src/app/common/Product';
import { PageService } from 'src/app/services/page.service';
import { StatisticalService } from 'src/app/services/statistical.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  listData!: MatTableDataSource<Product>;
  products!: Product[];
  productsLength!: number;
  columns: string[] = ['image', 'productId', 'name', 'quantity', 'category'];

  labels: string[] = [];
  data: number[] = [];
  myChartBar !: Chart;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pageService: PageService, private statisticalService: StatisticalService) { }

  ngOnInit(): void {
    this.pageService.setPageActive('inventory');
    this.getAll();
    Chart.register(...registerables);
  }

  getAll() {
    this.statisticalService.getInventory().subscribe(data => {
      this.products = data as Product[];
      this.listData = new MatTableDataSource(this.products);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      for(let i = 0; i < 10; i++) {
        this.labels.push(this.products[i].name);
        this.data.push(this.products[i].quantity);
      }
      this.loadChartBar();
    }, error => {
      console.log(error);
    })
  }

  loadChartBar() {
    this.myChartBar = new Chart('chart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          // label: '# of Votes',
          data: this.data,
          // borderColor: 'rgb(75, 192, 192)',
          // pointBorderColor: 'rgba(54, 162, 235, 0.2)',
          // backgroundColor: 'rgba(255, 99, 132, 0.2)',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(0, 162, 71, 0.2)',
            'rgba(82, 0, 36, 0.2)',
            'rgba(82, 164, 36, 0.2)',
            'rgba(255, 158, 146, 0.2)',
            'rgba(123, 39, 56, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(201, 203, 207, 1)',
            'rgba(0, 162, 71, 1)',
            'rgba(82, 0, 36, 1)',
            'rgba(82, 164, 36, 1)',
            'rgba(255, 158, 146, 1)',
            'rgba(123, 39, 56, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

}
