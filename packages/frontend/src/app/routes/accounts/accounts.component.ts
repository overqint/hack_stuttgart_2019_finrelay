import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { AccountsService } from '@shared/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
})
export class AccountsComponent implements OnInit {
  accounts: any[];
  constructor(private accountsService: AccountsService) {}

  async ngOnInit() {
    this.accounts = await this.accountsService.findAll();
  }
}
