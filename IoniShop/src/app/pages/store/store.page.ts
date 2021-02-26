import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';
import { StoreConfig } from 'src/app/model/store-config';
import { ItemsService } from 'src/app/services/items.service';
import { StoreSettingsService } from 'src/app/services/store-settings.service';

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
  
  itemList: Observable<Item[]>;


  constructor(
    private itemService: ItemsService,
    private router: Router,
    private menu: MenuController,
    public storeSettings: StoreSettingsService
    ) {

      //Get Settings from Store
      this.storeSettings.getSettings()
      .subscribe(settings => this.tempSettings = settings);
      
      //Get list of Shop items
      this.itemList = this.itemService.getItems();
    }


  ngOnInit() {
  }


  ionViewWillEnter() {

    //Enable Menu
    this.menu.enable(true);
  }


  //Go to Shopping Cart
  goToCart() {
    this.router.navigateByUrl('/cart');
  }

}
