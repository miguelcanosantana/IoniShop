import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Variables
  email: string;
  password: string;


  constructor(
    private router: Router,
    private menu: MenuController
    ) { }


  ngOnInit() {
  }


  //Using ionViewDidEnter instead ionViewWillEnter prevents missing menu hide animation
  ionViewDidEnter() {

    //Disable Menu
    this.menu.enable(false);
  }


  //Login and Redirect to Shop Page
  goToShop() {
  }


  //Redirect to Register Page
  goToRegister() {
    this.router.navigateByUrl("/register")
  }



}
