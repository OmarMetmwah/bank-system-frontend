import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { CustomersListComponent } from '../../customers-list/customers-list.component';
import { MakeTransactionComponent } from '../../make-transaction/make-transaction.component';
import { TransactionsListComponent } from '../../transactions-list/transactions-list.component';
import { DonationComponent } from '../../donation/donation.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CustomersListComponent,
    MakeTransactionComponent,
    TransactionsListComponent,
    DonationComponent,
  ]
})

export class AdminLayoutModule {}
