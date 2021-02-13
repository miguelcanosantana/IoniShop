import { ParseSpan } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //Variables
  fireId: string;
  name: string;
  last: string;
  email: string;
  password: string;

  /*
  user: User = {
    name: this.name,
    surname: this.last,
    isAdmin: false
  }*/


  constructor(private router: Router) { }


  ngOnInit() {
  }


  //Redirect to Login Page
  goBack() {
    this.router.navigateByUrl("/login")
  }

}
