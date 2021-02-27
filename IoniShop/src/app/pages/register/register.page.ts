import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { StoreConfig } from 'src/app/model/store-config';
import { StoreSettingsService } from 'src/app/services/store-settings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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
  password1: string;
  password2: string;


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


  //Try the register if passwords match and the fields aren't empty
  tryRegister() {

    //If one of them is null show toast for empty
    if (!this.email || !this.password1 || !this.password2) this.presentToastEmpty(); 

    //Else If passwords don't match show toast for passwords
    else if (this.password1 != this.password2) this.presentToastPassword();

    //Else do FireAuth Register
    else this.doRegister(this.email ,this.password1);
  }


  //Do Register
  async doRegister(email: string, password: string) {
    this.userService.createUser(email, password);
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


  //Show a wrong password values toast
  async presentToastPassword() {
    const toast = await this.toast.create({
      message: "Passwords don't match.",
      duration: 2000
    });
    toast.present();
  }

}
