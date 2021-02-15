import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
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
  name: String;
  surname: String;
  isAdmin: String;

  constructor(
    private productsService: ProductsService,
    private userService: UserService,
    private router: Router,
    private menu: MenuController
    ) {

    //Get list of Shop products
    this.productList = this.productsService.getItems();
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
