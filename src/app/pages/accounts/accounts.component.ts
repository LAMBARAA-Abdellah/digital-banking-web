import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountsService } from '../../services/accounts/accounts.service';
import { AccountDetails } from '../../model/account.model';
import { Observable } from 'rxjs';

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

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService
  ) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('')
    });
  }

  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountsService.getAccount(accountId, this.currentPage, this.pageSize);
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
