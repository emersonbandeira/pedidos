import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderCartComponent } from './order-cart/order-cart.component';

const routes: Routes = [
  { path: '', redirectTo:'/orders', pathMatch: 'full' },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/new', component: OrderFormComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: 'cart', component: OrderCartComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }


