import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Item } from 'src/app/model/item';
import { StoreConfig } from 'src/app/model/store-config';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { StoreSettingsService } from 'src/app/services/store-settings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  //Variables
  tempSettings: StoreConfig = {
    name: '',
    icon: '',
    image: '',
    mainColor: '',
    secondaryColor: '',
    roundType: 1
  }

  fireId: string;

  itemList: Item[];

  
  constructor(
    private itemService: ItemsService,
    private router: Router,
    private menu: MenuController,
    public storeSettings: StoreSettingsService,
    private userService: UserService,
    private cartService: CartService
    ) { 

      //Get Settings from Store
      this.storeSettings.getSettings()
      .subscribe(settings => this.tempSettings = settings);

      //Get User from UserService
      this.userService.getCurrentUser()
      .subscribe(user => this.fireId = user.uid);

      //Get User's Cart
      this.cartService.getCart()
      .subscribe(items => this.itemList = items);
      
    }


  ngOnInit() {
  }


  //Using ionViewDidEnter instead ionViewWillEnter prevents missing menu hide animation
  ionViewDidEnter() {

    //Optimize the Cart
    this.shrinkCart();
    

    //Disable Menu
    this.menu.enable(false);
  }

  //Optimize the Cart
  shrinkCart() {

    for (let i = 0; i < this.itemList.length; i++) {
      let item1 = this.itemList[i];
      if (!item1.count) item1.count = 1;

      for (let k = 0; k < this.itemList.length; k++) {
        let item2 = this.itemList[k];

        if (item1.itemId == item2.itemId && i != k) {
          
            item1.count ++;
            this.itemList.splice(k, 1)
        }
      }
    }
  }
}

