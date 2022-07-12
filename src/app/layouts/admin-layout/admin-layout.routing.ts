import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { CustomersListComponent } from '../../customers-list/customers-list.component';
import { MakeTransactionComponent } from '../../make-transaction/make-transaction.component';
import { TransactionsListComponent } from '../../transactions-list/transactions-list.component';
import { DonationComponent } from '../../donation/donation.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'customers-list',     component: CustomersListComponent },
    { path: 'makeTransaction',     component: MakeTransactionComponent },
    { path: 'transactions-list',          component: TransactionsListComponent },
    { path: 'donation',  component: DonationComponent }
];
