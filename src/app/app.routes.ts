import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CompteurComponent } from './pages/compteur/compteur.component';
import { AproposComponent } from './pages/apropos/apropos.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: AccueilComponent, canActivate: [authGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [authGuard] },
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/new', component: NewCustomerComponent},
  { path: 'accounts', component: AccountsComponent, canActivate: [authGuard] },
  { path: 'compteur', component: CompteurComponent, canActivate: [authGuard] },
  { path: 'apropos', component: AproposComponent, canActivate: [authGuard] },
  { path: 'products', component: AproposComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
