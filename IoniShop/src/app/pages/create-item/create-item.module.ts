import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateItemPageRoutingModule } from './create-item-routing.module';

import { CreateItemPage } from './create-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateItemPageRoutingModule
  ],
  declarations: [CreateItemPage]
})
export class CreateItemPageModule {}
