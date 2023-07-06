import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})

export class OrderFormComponent {

  order: Order = new Order();

  newOrder: any = {};

  constructor(private http: HttpClient, private router: Router) {}
/*
  createOrder(){
    this.newOrder.id = uuid();
    this.http.post<any>('http://localhost:3000/api/v2/orders', this.newOrder).subscribe((data) => {
      this.router.navigate(['/orders']);
    })
  }
*/
  onSubmit() {
    console.log('onSubmit OrderForm');
    this.order.uuid = uuid();
    this.order.selected = false;
    console.log('uuid:' + this.order.uuid + ' selected:' + this.order.selected );
    this.http.post('http://localhost:3000/api/v2/orders/', this.order).subscribe(
      (response) => {
        console.log('Pedido enviado com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao enviar o pedido', error );
      }
    );
    this.router.navigate(['/']);
  }

  goBack() {
    history.back();
  }

}
