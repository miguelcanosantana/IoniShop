import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Variables
  email: String;
  password: String;

  constructor(private router: Router) { }


  ngOnInit() {
  }


  //Login and Redirect to Shop Page
  goToShop() {

  }


  //Redirect to Register Page
  goToRegister() {
    this.router.navigateByUrl("/register")
  }



}
