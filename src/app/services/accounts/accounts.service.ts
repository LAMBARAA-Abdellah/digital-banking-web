import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AccountDetails } from '../../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private readonly apiUrl = `${environment.apiBaseUrl}/accounts`;

  constructor(private http: HttpClient) { }

  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails> {
    const url = `${this.apiUrl}/${accountId}/pageOperations`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<AccountDetails>(url, { params });
  }
  //function debit
  public debit(accountId: string, amount: number, description: string) {
    let data = {
      accountId: accountId,
      amount: amount,
      description: description
    };
    const url = `${this.apiUrl}/debit`;
    return this.http.post(url, data);
  }
  //function credit
  public credit(accountId: string, amount: number, description: string) {
    let data = {
      accountId: accountId,
      amount: amount,
      description: description
    };
    const url = `${this.apiUrl}/credit`;
    return this.http.post(url, data);
  }
  //function transfer
  public transfer(accountSource: string, accountDestination: string, amount: number) {
    let data = {
      accountSource: accountSource,
      accountDestination: accountDestination,
      amount: amount,
    };
    const url = `${this.apiUrl}/transfer`;
    return this.http.post(url, data);

  }
}
