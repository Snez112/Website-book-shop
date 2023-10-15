import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/common/Cart';
import { CartDetail } from 'src/app/common/CartDetail';
import { Category } from 'src/app/common/Category';
import { Customer } from 'src/app/common/Customer';
import { Favorites } from 'src/app/common/Favorites';
import { Product } from 'src/app/common/Product';
import { Rate } from 'src/app/common/Rate';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ProductService } from 'src/app/services/product.service';
import { RateService } from 'src/app/services/rate.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.component.html',
  styleUrls: ['./by-category.component.css']
})
export class ByCategoryComponent implements OnInit {

  products!: Product[];
  id!: number;

  customer!: Customer;
  favorite!: Favorites;
  favorites!: Favorites[];
  categories!: Category[];

  cart!: Cart;
  cartDetail!: CartDetail;
  cartDetails!: CartDetail[];
  
  page: number = 1;

  isLoading = true;

  key: string = '';
  keyF: string = '';
  reverse: boolean = true;

  rates!: Rate[];
  countRate!: number;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private rateService: RateService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private favoriteService: FavoritesService,
    private sessionService: SessionService,
    private categoryService : CategoryService) {
    route.params.subscribe(val => {
      this.ngOnInit();
    })
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProducts();
    this.getAllRate();
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
    })
  }

  getAllRate() {
    this.rateService.getAll().subscribe(data => {
      this.rates = data as Rate[];
    })
  }

  getAvgRate(id: number): number {
    let avgRating: number = 0;
    this.countRate = 0;
    for (const item of this.rates) {
      if (item.product.productId === id) {
        avgRating += item.rating;
        this.countRate++;
      }
    }
    return Math.round(avgRating/this.countRate * 10) / 10;
  }

  getProducts() {
    this.productService.getByCategory(this.id).subscribe(data => {
      this.isLoading = false;
      this.products = data as Product[];
    }, error => {
      this.toastr.error('Nhãn hàng không tồn tại!', 'Hệ thống');
      this.router.navigate(['/home'])
    })
  }

  toggleLike(id: number) {
    let email = this.sessionService.getUser();
    if (email == null) {
      this.router.navigate(['/sign-form']);
      this.toastr.info('Hãy đăng nhập để sử dụng dịch vụ của chúng tôi', 'Hệ thống');
      return;
    }
    this.favoriteService.getByProductIdAndEmail(id, email).subscribe(data => {
      if (data == null) {
        this.customerService.getByEmail(email).subscribe(data => {
          this.customer = data as Customer;
          this.favoriteService.post(new Favorites(0, new Customer(this.customer.userId), new Product(id))).subscribe(data => {
            this.toastr.success('Thêm thành công!', 'Hệ thống');
            this.favoriteService.getByEmail(email).subscribe(data => {
              this.favorites = data as Favorites[];
              this.favoriteService.setLength(this.favorites.length);
            }, error => {
              this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
            })
          }, error => {
            this.toastr.error('Thêm thất bại!', 'Hệ thống');
          })
        })
      } else {
        this.favorite = data as Favorites;
        this.favoriteService.delete(this.favorite.favoriteId).subscribe(data => {
          this.toastr.info('Đã xoá ra khỏi danh sách yêu thích!', 'Hệ thống');
          this.favoriteService.getByEmail(email).subscribe(data => {
            this.favorites = data as Favorites[];
            this.favoriteService.setLength(this.favorites.length);
          }, error => {
            this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
          })
        }, error => {
          this.toastr.error('Lỗi!', 'Hệ thống');
        })
      }
    })
  }

  sort(keyF: string) {
    if (keyF === 'enteredDate') {
      this.key = 'enteredDate';
      this.reverse = true;
    } else
      if (keyF === 'priceDesc') {
        this.key = '';
        this.products.sort((a,b)=>b.price-a.price);
      } else
        if (keyF === 'priceAsc') {
          this.key = '';
          this.products.sort((a,b)=>a.price-b.price);
        }
        else {
          this.key = '';
          this.getProducts();
        }
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
