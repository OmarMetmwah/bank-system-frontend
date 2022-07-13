import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
declare interface Transaction {
  id: string;
  sender: string;
  reciever: string;
  timing: string;
  amount: string;
}
let Transactions:Transaction[]; 

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  menuItems: any[];
  name:string;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get(`customers/${localStorage.getItem('user')}`).subscribe((res)=>{
      Transactions = (res as any).data;
      this.menuItems = Transactions.filter(menuItem => menuItem);
    })
    this.name = localStorage.getItem('user');
  }

  exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if((navigator as any).msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        (navigator as any).msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}

}
