import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { StoreConfig } from 'src/app/model/store-config';
import { StoreSettingsService } from 'src/app/services/store-settings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Variables
  tempSettings: StoreConfig = {
    name: '',
    icon: '',
    image: '',
    mainColor: '',
    secondaryColor: '',
    roundType: 1
  }

  email: string;
  password: string;


  constructor(
    private router: Router,
    private menu: MenuController,
    public storeSettings: StoreSettingsService,
    public toast: ToastController,
    private userService: UserService
  ) { 

    //Get Settings from Store
    this.storeSettings.getSettings()
    .subscribe(settings => this.tempSettings = settings);
  }


  ngOnInit() {}


  //Using ionViewDidEnter instead ionViewWillEnter prevents missing menu hide animation
  ionViewDidEnter() {

    //Disable Menu
    this.menu.enable(false);
  }


  //Try the Login if passwords match and the fields aren't empty
  tryLogin() {

    //If one of them is null show toast for empty
    if (!this.email || !this.password) this.presentToastEmpty(); 

    //Else do FireAuth Login
    else this.doLogin(this.email ,this.password);
  }


  //Do Login if data is correct, else show toast with an error
  async doLogin(email: string, password: string) {

    this.userService.login(email, password);
    this.router.navigateByUrl('/store');
  }


  //Show an empty values toast
  async presentToastEmpty() {
    const toast = await this.toast.create({
      message: "Fields can't be empty.",
      duration: 2000
    });
    toast.present();
  }


  //Go to Register Page
  goRegister() {
    this.router.navigateByUrl('/register');
  }

}
