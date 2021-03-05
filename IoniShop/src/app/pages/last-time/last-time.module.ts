import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LastTimePageRoutingModule } from './last-time-routing.module';

import { LastTimePage } from './last-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LastTimePageRoutingModule
  ],
  declarations: [LastTimePage]
})
export class LastTimePageModule {}
