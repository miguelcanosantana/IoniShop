import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Item } from 'src/app/model/item';
import { StoreConfig } from 'src/app/model/store-config';
import { ItemsService } from 'src/app/services/items.service';
import { StoreSettingsService } from 'src/app/services/store-settings.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {

  //Variables
  name: string;
  photo: string;
  price: number;
  shortDesc: string;
  longDesc: string;
  category: string;

  item: Item;

  tempSettings: StoreConfig = {
    name: '',
    icon: '',
    image: '',
    mainColor: '',
    secondaryColor: '',
    roundType: 1
  }


  constructor(
    private menu: MenuController,
    private itemService: ItemsService,
    private router: Router,
    public toast: ToastController,
    public storeSettings: StoreSettingsService
  ) {

    //Get Settings from Store
    this.storeSettings.getSettings()
    .subscribe(settings => this.tempSettings = settings);
  }


  ngOnInit() {
  }


  //Using ionViewDidEnter instead ionViewWillEnter prevents missing menu hide animation
  ionViewDidEnter() {

    //Disable Menu
    this.menu.enable(false);
  }


  //*Submit Product using Service
  submitItem() {

    this.item = {
      name: this.name,
      photo: this.photo,
      price: this.price,
      shortDesc: this.shortDesc,
      longDesc: this.longDesc,
      category: this.category
    };

    //If they are not null or empty do it and Redirect, else show Toast
    if (this.name && this.photo && this.price && this.shortDesc && this.longDesc && this.category) {
      this.itemService.submitItem(this.item);
      this.router.navigateByUrl('/store');

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
