import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface orderListOne {
  id: number;
  title: string;
  descripton: string;
  uuid: string;
  selected: boolean;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, MatPaginatorModule, MatButtonModule, NgIf , MatIconModule ]
})

export class OrderListComponent implements OnInit, AfterViewInit {
  
  public displayedColumns: string[] = ["id","title","description","uuid","selected"];
  
  public orders: Order[] = []; 

  public dataSource = new MatTableDataSource<Order>(this.orders);

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  
  pageEvent: any = PageEvent;
  length: number = 5;
  pageSize: number = 5;
  pageIndex: number = 0;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log(`Paginator:${this.paginator.length}`);
  }

  options: any;
  selection = new SelectionModel<Order>(true, []);

  highlightOrder: number | null = null;

  constructor( private http: HttpClient ) {
    

  }

  ngOnInit(){
    console.log('---> OrderList - onInit ---');
    /*
    this.http.get<Order[]>('http://localhost:3000/api/v2/orders').forEach(
      (orders) => {
        console.log('forEach');
        this.orders = orders;
        console.log(this.orders);
      }
    );
    */
    this.http.get<Order[]>('http://localhost:3000/api/v2/orders').subscribe(
      (orders) => {
        this.orders = orders;
        this.length = orders.length;
        console.log('orders.length:' + orders.length);
        this.dataSource = new MatTableDataSource<Order>(orders);
        this.paginator.length = orders.length;
        this.paginator.pageSize = 5;
        this.dataSource.paginator = this.paginator;
        
        console.log('this.paginator.length:' + this.paginator.length);
      },
      (error) => {
        console.error('Erro ao obter os pedidos', error);
      }

    );
    //console.log('---> OrderList - onInit - FINAL ----');
    
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
  
  deleteOrder(orderId: number) {
    // todo
  }

  editOrder(orderId: number) {
    // todo
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    const numOrders = this.orders.length;
    const numTotal = numRows ? numRows : numOrders; 
    //console.log('numOrders:' + numOrders + ' numTotal:' + numTotal );
  
    //console.log('numSelected:' + numSelected + ' numRows:' + numRows);

    return numSelected === numTotal;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      //console.log('------- AllSelected -------');
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Order): string {
    //console.log('checkboxLabel');
    //console.log('row:' + row);  

    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }


    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
    
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    console.log('e.length:'+ e.length + ' e.pageSize:' + e.pageSize);
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.dataSource.paginator = this.paginator;
  }


}
