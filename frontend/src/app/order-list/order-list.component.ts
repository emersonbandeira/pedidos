import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order.model';import { environmentt } from '../environment';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];

  highlightOrder: number | null = null;

  constructor( private http: HttpClient ) {}

  ngOnInit(){
    console.log('OrderList - onInit');

    this.http.get<Order[]>('http://localhost:3000/api/v2/orders').subscribe(
      (orders) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Erro ao obter os pedidos', error);
      }
    );
  }

  getOrders(){
    console.log('OrderList - getOrders');

    this.http.get<Order[]>('http://localhost:3000/api/v2/orders').subscribe(
      (orders) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Erro ao obter os pedidos', error);
      }
    );
  }

  showDetails(orderId: number) {
    this.highlightOrder = orderId;
  }

  hideDetails() {
    this.highlightOrder = null;
  }

}
