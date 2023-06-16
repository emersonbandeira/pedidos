import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})

export class OrderFormComponent {

  newOrder: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  createOrder(){
    this.newOrder.id = uuid();
    this.http.post<any>('http://localhost:3000/api/orders', this.newOrder).subscribe((data) => {
      this.router.navigate(['/orders']);
    })
  }

  goBack() {
    history.back();
  }

}
