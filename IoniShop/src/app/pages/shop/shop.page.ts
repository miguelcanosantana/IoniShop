import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  //List of products to get from FireBase
  productList: Observable<Product[]>;

  //Variables
  uid: String;
  name: String;
  surname: String;
  isAdmin: String;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router,
    private menu: MenuController
    ) {

    //Get list of Shop products
    this.productList = this.productsService.getItems();

    //Get Uid
    //uid = this.authService.getCurrentUser().subscribe
  }


  ngOnInit() { }


  ionViewWillEnter() {

    //Enable Menu
    this.menu.enable(true);
  }


  //Redirect to Shopping Cart
  goToCart() {
    this.router.navigateByUrl('/cart')
  }

}
