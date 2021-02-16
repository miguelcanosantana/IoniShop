import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateItemPage } from './create-item.page';

const routes: Routes = [
  {
    path: '',
    component: CreateItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateItemPageRoutingModule {}
