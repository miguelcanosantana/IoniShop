import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreDashboardPageRoutingModule } from './store-dashboard-routing.module';

import { StoreDashboardPage } from './store-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreDashboardPageRoutingModule
  ],
  declarations: [StoreDashboardPage]
})
export class StoreDashboardPageModule {}
