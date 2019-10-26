import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ContractsService } from '@shared/contracts.service';
import { Router } from '@angular/router';
import { PubSubService } from '@shared/pub-sub.service';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
})
export class CreateContractComponent {
  constructor(private contractsService: ContractsService, private router: Router, private pubSubService: PubSubService) {}

  contract: any = {
    name: '',
    linkedContract: {
      iban: '',
      accessToken: '',
    },
  };

  async save() {
    const createdContract = await this.contractsService.createContract(this.contract);
    this.pubSubService.publish({ type: 'contracts-updated' });
    this.router.navigate(['/contracts', createdContract._id]);
  }
}
