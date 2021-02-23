import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreDashboardPage } from './store-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: StoreDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreDashboardPageRoutingModule {}
