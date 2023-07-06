import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderFormComponent,
    OrderDetailsComponent,
    OrderCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
