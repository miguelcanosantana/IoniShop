import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Item } from 'src/app/model/item';
import { StoreConfig } from 'src/app/model/store-config';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { StoreSettingsService } from 'src/app/services/store-settings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  //Variables
  tempSettings: StoreConfig = {
    name: '',
    icon: '',
    image: '',
    mainColor: '',
    secondaryColor: '',
    roundType: 1
  }

  itemId: string;

  item: Item = {
    name: '',
    photo: '',
    price: 0,
    shortDesc: '',
    longDesc: '',
    category: ''
  }

  fireId: string;

  constructor(
    private router: Router,
    private menu: MenuController,
    public storeSettings: StoreSettingsService,
    private itemService: ItemsService,
    public userService: UserService,
    private cartService: CartService,
    private alertController: AlertController
  ) {

    //Get Settings from Store
    this.storeSettings.getSettings()
    .subscribe(settings => this.tempSettings = settings);

    //Get User from UserService
    this.userService.getCurrentUser()
    .subscribe(user => this.fireId = user.uid);

    //Get Item that has been clicked
    this.itemId = this.itemService.retrieveItemId();

    this.itemService.getItemById(this.itemId)
    .subscribe(item => this.item = item);
   }


  ngOnInit() {}


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
