import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})

export class OrderDetailsComponent implements OnInit {

  order: any = {};

  editing = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('OrderDetailsComponent');
    this.getOrder();
  }

  getOrder() { 
    const orderId = this.route.snapshot.paramMap.get('id'); 
    console.log('get Order ()...' + this.editing);
    console.log(orderId);
    this.http.get<any>('http://localhost:3000/api/orders/' + orderId ).subscribe((data) => { 
      this.order = data; 
    }); 
  }

  deleteOrder() {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.http.delete<any>('http://localhost:3000/api/orders/${orderId}').subscribe(() => {
    this.router.navigate(['/orders']);
    });
  }

  goBack(){
    history.back();
  }

  editOrder() {
    this.editing = true;
  }

  saveOrder() {
    console.log('===>>> saveOrder put');
    const orderId = this.route.snapshot.paramMap.get('id');
    this.http.put<any>('http://localhost:3000/api/orders/' + orderId, this.order).subscribe(() => {
      this.editing = false;
    });
  }

  cancelEditOrder(): void {
    this.editing = false;
    this.getOrder();
  }
 
}
