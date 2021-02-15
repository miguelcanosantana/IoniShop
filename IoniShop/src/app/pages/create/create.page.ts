import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private productService: ProductsService,
    private router: Router,
    public toast: ToastController
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

    //If they are not null or empty do it and Redirect, else show Toast
    if (this.name && this.photo && this.price && this.shortDesc && this.longDesc && this.category) {
      this.productService.submitProduct(this.product);
      this.router.navigateByUrl('/shop');

    } else this.presentToast();

    
  }


  //Show an empty values toast
  async presentToast() {
    const toast = await this.toast.create({
      message: "Fields can't be empty.",
      duration: 2000
    });
    toast.present();
  }

}
