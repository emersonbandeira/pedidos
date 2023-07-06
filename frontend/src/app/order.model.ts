import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Order {
    
    id!: number;
    title!: string;
    description!: string;
    uuid!: string;
    selected!: boolean;

}