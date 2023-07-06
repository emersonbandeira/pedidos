import { Component } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { NgIf} from '@angular/common';
import { MatSidenavModule} from '@angular/material/sidenav';
import { OrderListComponent } from '../order-list/order-list.component';
import {MatIconModule} from '@angular/material/icon';
import {ThemePalette} from '@angular/material/core';
import {NgFor} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import { Router } from '@angular/router';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [ MatButtonModule, NgIf, MatSidenavModule, OrderListComponent, MatIconModule, NgFor, MatChipsModule]
})



export class DashboardComponent {
  showFiller = false;

  availableColors: ChipColor[] = [
    {name: 'none', color: undefined},
    {name: 'Primary', color: 'primary'},
    {name: 'Accent', color: 'accent'},
    {name: 'Warn', color: 'warn'},
  ];

  constructor(private router: Router) {}

  newOrder() {
    this.router.navigate(['/orders/new']);
  }


}
