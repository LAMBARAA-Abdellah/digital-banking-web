import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../model/customer.model';

@Component({
  selector: 'app-customer-accounts',
  imports: [],
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css'] // ✅ styleUrls au pluriel
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: string;
  customer!: Customer;

  constructor(private route: ActivatedRoute, private router: Router) {
    // Récupération de l'objet Customer depuis l'état de navigation
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
  }
}
