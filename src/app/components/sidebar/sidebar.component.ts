import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/customers-list', title: 'Customers',  icon:'content_paste', class: '' },
    { path: '/transactions-list', title: 'Transactions',  icon:'table_rows', class: '' },
    { path: '/makeTransaction', title: 'Make Transaction',  icon:'currency_exchange', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  notifications:string[];

  constructor() { 
    if(localStorage.getItem('notifications')){
      this.notifications =JSON.parse(localStorage.getItem("notifications"));
  }
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
