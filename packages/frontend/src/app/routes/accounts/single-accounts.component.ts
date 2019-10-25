import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '@shared/accounts.service';

@Component({
  selector: 'app-single-account',
  templateUrl: './single-account.component.html',
})
export class SingleAccountComponent implements OnInit {
  constructor(private accountsService: AccountsService, private route: ActivatedRoute) { }

  accountId: string;
  transactions: any[];
  account: any;

  ngOnInit() {
    this.route.params.subscribe(async params => {
      const accountId = params.accountId;
      this.account = await this.accountsService.findById(accountId);
      this.transactions = await this.accountsService.getTransactionsByAccountId(accountId);
    });
  }

  onClickButton() {
    alert('Hello!');
  }
}
