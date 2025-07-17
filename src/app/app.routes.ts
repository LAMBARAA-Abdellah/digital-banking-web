import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';
import { CustomerAccountsComponent } from './pages/customer-accounts/customer-accounts.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/new', component: NewCustomerComponent},
  { path: 'customer-accounts/:id', component: CustomerAccountsComponent},
  { path: 'accounts', component: AccountsComponent},
  { path: '**', redirectTo: '' }
];
