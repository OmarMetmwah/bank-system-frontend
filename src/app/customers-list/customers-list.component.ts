import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

export declare interface Customer {
  name: string;
  email: string;
  lasttransaction: string;
  currentbalance: string;
}
let Customers:Customer[]; 

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  menuItems: any[];
  path:string='/user-profile';

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get('customers').subscribe((res) => {
      Customers = (res as any).data;
      this.menuItems = Customers.filter(menuItem => menuItem);
    });
  }
  setUser(name:string){
    localStorage.setItem('user',name);
  }


}
