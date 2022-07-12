import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

export declare interface Transaction {
  id: string;
  sender: string;
  reciever: string;
  timing: string;
  amount: string;
}
let Transactions:Transaction[]; 

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {
  menuItems: any[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get('transactions').subscribe((res) => {
      Transactions = (res as any).data;
      this.menuItems = Transactions.filter(menuItem => menuItem);
    });
  }


}
