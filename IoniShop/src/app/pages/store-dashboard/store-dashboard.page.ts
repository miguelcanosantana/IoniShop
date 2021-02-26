import { Component, OnInit } from '@angular/core';
import { IonThumbnail, MenuController } from '@ionic/angular';
import { StoreConfig } from 'src/app/model/store-config';
import { StoreSettingsService } from 'src/app/services/store-settings.service';

@Component({
  selector: 'app-store-dashboard',
  templateUrl: './store-dashboard.page.html',
  styleUrls: ['./store-dashboard.page.scss'],
})
export class StoreDashboardPage implements OnInit {

  //Variables
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


  //Save Settings
  saveSettings() {
    this.storeSettings.addCustomSettings(this.tempSettings);
    console.log("Saved Settings to FireBase");
  }

  //Reset Settings
  resetSettings() {
    this.storeSettings.addCustomSettings(this.storeSettings.defaultSettings);
    console.log("Default Settings Added to FireBase");
  }

}
