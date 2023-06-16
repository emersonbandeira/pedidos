import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: any[] = [];

  highlightOrder: string | null = null;

  constructor( private http: HttpClient ) { }

  ngOnInit(){
    this.getOrders();
  }

  getOrders(){
    this.http.get<any[]>('http://localhost:3000/api/orders').subscribe((data) => {
      this.orders = data;
    });
  }

  showDetails(orderId: string) {
    this.highlightOrder = orderId;
  }

  hideDetails() {
    this.highlightOrder = null;
  }

}
