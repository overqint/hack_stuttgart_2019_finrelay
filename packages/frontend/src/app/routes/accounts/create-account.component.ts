import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { AccountsService } from '@shared/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent {
  constructor(private accountsService: AccountsService, private router: Router) {}

  account: any = {
    name: '',
    linkedAccount: {
      iban: '',
      accessToken: '',
    },
  };

  async save() {
    const createdAccount = await this.accountsService.createAccount(this.account);
    this.router.navigate(['/accounts', createdAccount._id]);
  }
}
