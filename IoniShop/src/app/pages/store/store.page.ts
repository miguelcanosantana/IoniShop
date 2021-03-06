import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';
import { StoreConfig } from 'src/app/model/store-config';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { StoreSettingsService } from 'src/app/services/store-settings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

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
    public userService: UserService,
    private cartService: CartService,
    public alertController: AlertController,
    public modalController: ModalController
    ) {

      //Get Settings from Store
      this.storeSettings.getSettings()
      .subscribe(settings => this.tempSettings = settings);

      //Get User from UserService
      this.userService.getCurrentUser()
      .subscribe(user => this.fireId = user.uid);

      //Get list of Shop items
      this.itemService.getItems()
      .subscribe(allItems => this.itemList = allItems);
    }


  ngOnInit() {
    console.log(this.fireId)
  }


  ionViewWillEnter() {

    //Enable Menu
    this.menu.enable(true);
  }


  //Go to Shopping Cart
  goToCart() {
    this.router.navigateByUrl('/cart');
  }


  //Go to Details Page of the Item
  goToDetails(itemId: string) {
    this.itemService.passItemId(itemId);
    this.router.navigateByUrl('/item-details');
  }


  //Add an Item to the User's Cart in FireStore
  async addToCart(item: Item) {
    this.cartService.addToCart(item);
  }


  //Show Login Dialog and redirect to Login page if User wants
  async presentLoginDialog(itemName: string) {
    const alert = await this.alertController.create({
      cssClass: 'loginDialog',
      header: 'Login to buy Items',
      message: '<strong> Do you want to Login now? </strong> ' + 
      '</strong>. <br> <br> You need to Login to buy Items like <strong> '+ itemName + ' </strong>.',
      buttons: [
        {
          text: 'Not Yet',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Login/Register',
          handler: () => {
            this.router.navigateByUrl('/login')
          }
        }
      ]
    });

    await alert.present();
  }

}
