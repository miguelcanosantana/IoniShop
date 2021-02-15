import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


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
  isAdmin: boolean;


  constructor(
    private router: Router,
    private authService: AuthService,
    ) { }


  ngOnInit() {
  }


  //*Register User, login and redirect
  async registerUser() {

    await this.authService.createUser(this.email, this.password);
    this.router.navigateByUrl('/shop');
  }


  //Redirect to Login Page
  goBack() {
    this.router.navigateByUrl("/login")
  }

}
