import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StoreConfig } from 'src/app/model/store-config';
import { StoreSettingsService } from 'src/app/services/store-settings.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

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
    private router: Router,
    private menu: MenuController,
    public storeSettings: StoreSettingsService
    ) {

      //Get Settings from Store
      this.storeSettings.getSettings()
      .subscribe(settings => this.tempSettings = settings);
    }


  ngOnInit() {}


  //Receives an Url, navigates to it and closes menu
  goToUrl(url: string) {
    this.router.navigateByUrl(url);
    this.menu.toggle();
  }

}
