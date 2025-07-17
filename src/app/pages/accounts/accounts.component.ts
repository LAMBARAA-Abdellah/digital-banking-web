import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountsService } from '../../services/accounts/accounts.service';
import { AccountDetails } from '../../model/account.model';
import { catchError, Observable, of, throwError } from 'rxjs';
import e from 'express';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  operationFormGroup!: FormGroup;
  errorMessage: string = '';


  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService
  ) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('')
    });
    this.operationFormGroup = this.fb.group({
      accountId: this.fb.control(this.accountFormGroup.value.accountId),
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null)

    });
  }

  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId;
    //if account not found affiche swal fire erreur 
    if (!accountId) {
      this.errorMessage = 'Veuillez saisir un identifiant de compte';
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: this.errorMessage,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }
    this.accountObservable = this.accountsService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        const message = err?.error?.message || 'Compte introuvable';
        this.errorMessage = message;
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: message,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        return throwError(err);
      })
    );
  }

  handleAccountOperation() {
    let accountId: string = this.accountFormGroup.value.accountId;
    let operationType: string = this.operationFormGroup.value.operationType;
    let amount: number = this.operationFormGroup.value.amount;
    let description: string = this.operationFormGroup.value.description;
    let accountDestination: string = this.operationFormGroup.value.accountDestination;
    if (operationType == 'DEBIT') {
      this.accountsService.debit(accountId, amount, description).subscribe({
        next: (data) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Debit operation completed successfully',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });

          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.message,
            icon: 'error'
          });
        }
      });

    } else if (operationType == 'CREDIT') {
      this.accountsService.credit(accountId, amount, description).subscribe({
        next: (data) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Credit operation completed successfully',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.message,
            icon: 'error'
          });
        }
      });
    }
    else if (operationType == 'TRANSFER') {
      this.accountsService.transfer(accountId, accountDestination, amount).subscribe({
        next: (data) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Transfer operation completed successfully',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
          this.operationFormGroup.reset();

          this.handleSearchAccount();
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.message,
            icon: 'error'
          });
        }
      });
    }
    //reset the form
  }

  nextPage() {
    this.currentPage++;
    this.handleSearchAccount();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.handleSearchAccount();
    }
  }
}
