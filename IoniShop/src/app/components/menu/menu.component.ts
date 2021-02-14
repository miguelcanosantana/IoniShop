import { Component, OnInit } from '@angular/core';
import { Router, ɵROUTER_PROVIDERS } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private menu: MenuController,
    ) { }
    

  ngOnInit() {}


  //Receives an Url, navigates to it and closes menu
  goToUrl(url: string) {
    this.router.navigateByUrl(url);
    this.menu.toggle();
  }

}
