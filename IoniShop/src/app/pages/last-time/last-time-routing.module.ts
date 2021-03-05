import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LastTimePage } from './last-time.page';

const routes: Routes = [
  {
    path: '',
    component: LastTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LastTimePageRoutingModule {}
