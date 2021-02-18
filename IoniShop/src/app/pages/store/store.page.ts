import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  //List of items to get from FireBase
  itemList: Observable<Item[]>;

  constructor(
    private itemService: ItemsService,
    private router: Router,
    private menu: MenuController
    ) {
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
