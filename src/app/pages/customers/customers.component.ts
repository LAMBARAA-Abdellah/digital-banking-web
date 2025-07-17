import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customers/customer.service';
import { Customer } from '../../model/customer.model';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']

})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  searchKeyword: string = '';
  isLoading = true;
  newCustomer: Customer = { id: 0, name: '', email: '' };
  editingCustomer: Customer | null = null;
  errorMessage = '';
  searchFormFroup!: FormGroup;

  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.searchFormFroup = this.fb.group({
      keyword: ['']
    });
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.customerService.getCustomers().subscribe({
      next: data => {
        this.customers = data;
        this.isLoading = false;
      },
      error: err => {
        this.errorMessage = 'Erreur de chargement des clients';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const keyword = this.searchFormFroup.value.keyword?.trim();

    if (!keyword) {
      this.loadCustomers();
      return;
    }

    this.isLoading = true;
    this.customerService.searchCustomers(keyword).subscribe({
      next: (results) => {
        this.customers = results;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  createCustomer(): void {
    this.customerService.addCustomer(this.newCustomer).subscribe({
      next: customer => {
        this.customers.push(customer);
        this.newCustomer = { id: 0, name: '', email: '' };
      }
    });
  }

  editCustomer(customer: Customer): void {
    this.editingCustomer = { ...customer };
  }

  updateCustomer(): void {
    if (!this.editingCustomer) return;

    this.customerService.updateCustomer(this.editingCustomer).subscribe({
      next: updated => {
        this.customers = this.customers.map(c =>
          c.id === updated.id ? updated : c
        );
        this.editingCustomer = null;
      }
    });
  }

  deleteCustomer(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(id).subscribe({
          next: () => {
            this.customers = this.customers.filter(c => c.id !== id);

            Swal.fire({
              title: 'Supprimé !',
              text: 'Le client a bien été supprimé.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            this.errorMessage = err.message;
            this.isLoading = false;

            Swal.fire({
              title: 'Erreur',
              text: 'Impossible de supprimer le client.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  cancelEdit(): void {
    this.editingCustomer = null;
  }

  handleCustomerAccounts(customer: Customer): void {
    console.log(customer);
    this.router.navigateByUrl("/customer-accounts/" + customer.id, { state: { customer } });
  }
}
