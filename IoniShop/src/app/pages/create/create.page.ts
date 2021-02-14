import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {

  //Variables
  name: string;
  photo: string;
  price: number;
  shortDesc: string;
  longDesc: string;
  category: string;

  product: Product;


  constructor(
    private menu: MenuController,
    private productService: ProductsService
    ) { }


  ngOnInit() {
  }


  //Using ionViewDidEnter instead ionViewWillEnter prevents missing menu hide animation
  ionViewDidEnter() {

    //Disable Menu
    this.menu.enable(false);
  }


  //*Submit Product using Service
  submitProduct() {

    this.product = {
      name: this.name,
      photo: this.photo,
      price: this.price,
      shortDesc: this.shortDesc,
      longDesc: this.longDesc,
      category: this.category
    };

    this.productService.submitProduct(this.product);
  }

}
