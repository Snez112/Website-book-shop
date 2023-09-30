import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/common/Cart';
import Swal from 'sweetalert2';
import { CartDetail } from 'src/app/common/CartDetail';
import { Favorites } from 'src/app/common/Favorites';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { SessionService } from 'src/app/services/session.service';
import { Product } from 'src/app/common/Product';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  favorites!:Favorites[];

  cart!: Cart;
  cartDetail!: CartDetail;
  cartDetails!: CartDetail[];

  page: number = 1;

  constructor(private toastr: ToastrService,
    private cartService: CartService,
    private favoriteService: FavoritesService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.getAll();
  }

  getAll() {
    let email = this.sessionService.getUser();
    this.favoriteService.getByEmail(email).subscribe(data=>{
      this.favorites = data as Favorites[];
      this.favoriteService.setLength(this.favorites.length);
    }, error=>{
      this.toastr.error('Lỗi server', 'Hệ thống');
    })
  }

  delete(id: number, name: string) {
    Swal.fire({
      title: 'Bạn muốn xoá sản phẩm ' + name + ' ra khỏi danh sách yêu thích ?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.favoriteService.delete(id).subscribe(data=>{
          this.toastr.info('Đã xoá ra khỏi danh sách yêu thích!', 'Hệ thống');
          this.ngOnInit();
        }, error=>{
          this.toastr.error('Lỗi', 'Hệ thống');
          this.ngOnInit();
        })
      }
    })    
  }

  addCart(productId: number, price: number) {
    let email = this.sessionService.getUser();
    if (email == null) {
      this.router.navigate(['/sign-form']);
      this.toastr.info('Hãy đăng nhập để sử dụng dịch vụ của chúng tôi', 'Hệ thống');
      return;
    }
    this.cartService.getCart(email).subscribe(data => {
      this.cart = data as Cart;
      this.cartDetail = new CartDetail(0, 1, price, new Product(productId), new Cart(this.cart.cartId));
      this.cartService.postDetail(this.cartDetail).subscribe(data => {
        this.toastr.success('Thêm vào giỏ hàng thành công!', 'Hệ thống!');
        this.cartService.getAllDetail(this.cart.cartId).subscribe(data => {
          this.cartDetails = data as CartDetail[];
          this.cartService.setLength(this.cartDetails.length);
        })
      }, error => {
        this.toastr.error('Sản phẩm này có thể đã hết hàng!', 'Hệ thống');
        this.router.navigate(['/home']);
        window.location.href = "/";
      })
    })
  }

}
