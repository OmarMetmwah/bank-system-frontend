import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Customer } from 'app/customers-list/customers-list.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

let Customers:Customer[]; 
declare var $: any;

@Component({
  selector: 'app-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.css']
})
export class MakeTransactionComponent implements OnInit {
  menuItems: Customer[];
  to:HTMLInputElement;from:HTMLInputElement;amount:HTMLInputElement;
  constructor(private api: ApiService) { }
  myControl = new FormControl('');
  options: string[];
  users: string[]=[];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.options=[];
    this.api.get('customers').subscribe((res)=>{
      Customers = (res as any).data;
      for(let x in Customers){
        this.options.push(Customers[x].name+"  ,"+Customers[x].currentbalance+"$");
        this.users.push(Customers[x].name);
      }
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  feedbackFn(flag:boolean,message:string){
    if(flag){
      this.to.value='';this.from.value='';this.amount.value='';
        this.ngOnInit();
        this.showNotification('top','right',2,message);
    }else{
      this.showNotification('top','right',4,message);

    }
  }
  makeTrans(){
    this.to = (document.getElementById('to') as HTMLInputElement);
    this.from = (document.getElementById('from')as HTMLInputElement);
    this.amount = (document.getElementById('amount')as HTMLInputElement);
    if(!this.users.includes(this.to.value.split(" ")[0])||!this.users.includes(this.from.value.split(" ")[0])) return this.feedbackFn(false,'User is not one of our cutomers');
    else if(this.to.value.split(" ")[0]===this.from.value.split(" ")[0])
    return this.feedbackFn(false,'Can not trasfer money to same account')

    this.api.post('transactions',{to:this.to.value.split(" ")[0],from:this.from.value.split(" ")[0],amount:this.amount.value.split(" ")[0]}).subscribe((res) => {
      if((res as any).status==='success'){
        let notifications = JSON.parse(localStorage.getItem('notifications'))
        notifications.push((res as any).data)
        localStorage.setItem("notifications", JSON.stringify(notifications));
        this.feedbackFn(true,(res as any).data);
      }else if(((res as any).data as string).includes('violates check constraint "balance_nonnegative')){
        this.feedbackFn(false,'There is no enough balance to trasfer')
      }else{
        this.feedbackFn(false,"")
      }
    });
  }
  showNotification(from, align,color,content){
    const type = ['','info','success','warning','danger'];

    $.notify({
        icon: "notifications",
        message: content

    },{
        type: type[color],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
  

}
