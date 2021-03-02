import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { StoreConfig } from 'src/app/model/store-config';
import { UserDetails } from 'src/app/model/user-details';
import { CartService } from 'src/app/services/cart.service';
import { StoreSettingsService } from 'src/app/services/store-settings.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
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

  tempDetails: UserDetails = {
    username: '',
    firstName: '',
    lastName: ''
  }

  email: string;
  password1: string;
  password2: string;

  fireId: string;

  constructor(
    private router: Router,
    private menu: MenuController,
    public storeSettings: StoreSettingsService,
    public toast: ToastController,
    public userService: UserService,
    private userDetailsService: UserDetailsService
  ) {

    //Get Settings from Store
    this.storeSettings.getSettings()
    .subscribe(settings => this.tempSettings = settings);


    //Close previous session.
    this.userService.logout();
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
    if (!this.email || !this.password1 || !this.password2 || !this.tempDetails.username) this.presentToastEmpty(); 

    //Else If passwords don't match show toast for passwords
    else if (this.password1 != this.password2) this.presentToastPassword();

    //Else do FireAuth Register
    else this.doRegister(this.email ,this.password1);
  }


  //Do Register and add User info.
  async doRegister(email: string, password: string) {

      await this.userService.createUser(email, password);

      this.userService.getCurrentUser()
      .subscribe(user => this.fireId = user.uid);

      await this.userService.login(email, password);

      console.log("Account data was created." + this.fireId);
      await this.userDetailsService.addCustomSettings(this.fireId, this.tempDetails);

      await this.presentToastAccount();
      
      await this.router.navigateByUrl('/store');
    
  }



  //Show an empty values toast
  async presentToastEmpty() {
    const toast = await this.toast.create({
      message: "Required fields can't be empty.",
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

  //Show toast when succesful login after created account
  async presentToastAccount() {
    const toast = await this.toast.create({
      message: "Account was successfully made. You can buy Items now.",
      duration: 4000
    });
    toast.present();
  }

}
