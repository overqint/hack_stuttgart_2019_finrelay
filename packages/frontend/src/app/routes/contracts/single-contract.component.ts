import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '@shared/contracts.service';
import { AccountsService } from '@shared/accounts.service';
import { FrontendNotificationService } from '@shared/frontend-notification.service';

@Component({
  selector: 'app-single-contract',
  templateUrl: './single-contract.component.html',
})
export class SingleContractComponent implements OnInit {
  constructor(
    private accountsService: AccountsService,
    private contractsService: ContractsService,
    private route: ActivatedRoute, private notification: FrontendNotificationService
  ) { }

  contract: any;
  activatedAccounts: any[];
  accounts: any[];
  pageTitle: string = 'View Contract';

  ngOnInit() {
    this.route.params.subscribe(async params => {
      const contractId = params.contractId;
      this.contract = await this.contractsService.findOneById(contractId);
      this.updatePageTitle();
      this.accounts = await this.accountsService.findAll();
      this.activatedAccounts = this.accounts.map(e => this.mapToActivatedAccount(e));
    });
  }

  private updatePageTitle() {
    this.pageTitle = `View Contract: ${this.contract.name}`;
  }

  execute() {
    this.contractsService.executeOneById(this.contract._id, {});
    this.notification.create('warning', 'Best App', 'In the World has executed your Contract');
  }

  private mapToActivatedAccount(e: any): { title: any; direction: string } {
    const accountInContract = this.contract.accounts.indexOf(e._id) >= 0;
    return {
      _id: e._id,
      title: e.name,
      direction: accountInContract ? 'right' : 'left',
    } as any;
  }

  async save() {
    this.contract.accounts = this.activatedAccounts.filter(e => e.direction === 'right').map(e => e._id);
    await this.contractsService.updateOneById(this.contract._id, this.contract);
  }

}
