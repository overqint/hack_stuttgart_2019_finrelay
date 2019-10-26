import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { AccountsService } from '@shared/accounts.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent {
  constructor(private accountsService: AccountsService) {}

  account: any = {
    name: '',
    linkedAccount: {
      iban: '',
      accessToken: '',
    },
  };

  save() {
    this.accountsService.createAccount(this.account);
  }
}
