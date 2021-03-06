import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'last-time',
    pathMatch: 'full'
  },
  {
    path: 'store',
    loadChildren: () => import('./pages/store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'create-item',
    loadChildren: () => import('./pages/create-item/create-item.module').then( m => m.CreateItemPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'store-dashboard',
    loadChildren: () => import('./pages/store-dashboard/store-dashboard.module').then( m => m.StoreDashboardPageModule)
  },
  {
    path: 'user-page',
    loadChildren: () => import('./pages/user-page/user-page.module').then( m => m.UserPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'item-details',
    loadChildren: () => import('./pages/item-details/item-details.module').then( m => m.ItemDetailsPageModule)
  },
  {
    path: 'last-time',
    loadChildren: () => import('./pages/last-time/last-time.module').then( m => m.LastTimePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
