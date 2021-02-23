import { Component, OnInit } from '@angular/core';
import { IonThumbnail, MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StoreConfig } from 'src/app/model/store-config';
import { StoreSettingsService } from 'src/app/services/store-settings.service';

@Component({
  selector: 'app-store-dashboard',
  templateUrl: './store-dashboard.page.html',
  styleUrls: ['./store-dashboard.page.scss'],
})
export class StoreDashboardPage implements OnInit {

  //Variables
  settings: Observable<StoreConfig[]>;

  constructor(
    private menu: MenuController,
    private storeSettings: StoreSettingsService
    ) {}


  ngOnInit() {
  }


  //Using ionViewDidEnter instead ionViewWillEnter prevents missing menu hide animation
  ionViewDidEnter() {

    //Disable Menu
    this.menu.enable(false);
  }

}
