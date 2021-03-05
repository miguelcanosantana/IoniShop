import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { MenuController } from '@ionic/angular';
import { StoreConfig } from 'src/app/model/store-config';
import { StoreSettingsService } from 'src/app/services/store-settings.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-last-time',
  templateUrl: './last-time.page.html',
  styleUrls: ['./last-time.page.scss'],
})
export class LastTimePage implements OnInit {

  //Variables
  tempSettings: StoreConfig = {
    name: '',
    icon: '',
    image: '',
    mainColor: '',
    secondaryColor: '',
    roundType: 1
  }

  lastDate: Date;


  constructor(
    private router: Router,
    private menu: MenuController,
    public storeSettings: StoreSettingsService
  ) { 

    //Get Settings from Store
    this.storeSettings.getSettings()
    .subscribe(settings => this.tempSettings = settings);

    //Call Get last Date from Local Store
    this.getLastDate().then(
      date => this.lastDate = date
    );
    console.log(this.lastDate);
  }


  ngOnInit() {}


  //Using ionViewDidEnter instead ionViewWillEnter prevents missing menu hide animation
  ionViewDidEnter() {

    //Disable Menu
    this.menu.enable(false);
  }
  

  //Set the last time to when the button has been clicked and redirect to Shop
  enterShop() {
    let currentDate = new Date;
    console.log(currentDate);
    this.saveLastDate(currentDate);
    this.router.navigateByUrl('/store')
  }


  //Get the Last Date the Local Storage
  public async getLastDate(): Promise<Date> {

    const date = await Storage.get({ key: 'lastDate' });
    return JSON.parse(date.value) ? JSON.parse(date.value) : [];
  }


  //Save Last Date when accessing the App
  public async saveLastDate(date: Date) {

    await Storage.set({
      key: 'lastDate',
      value: JSON.stringify(date)
    });
  }

}
