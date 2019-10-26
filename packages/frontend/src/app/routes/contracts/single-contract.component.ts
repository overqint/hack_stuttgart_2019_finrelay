import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '@shared/contracts.service';

@Component({
  selector: 'app-single-contract',
  templateUrl: './single-contract.component.html',
})
export class SingleContractComponent implements OnInit {
  constructor(private contractsService: ContractsService, private route: ActivatedRoute) {}

  contract: any;

  ngOnInit() {
    this.route.params.subscribe(async params => {
      const contractId = params.contractId;
      this.contract = await this.contractsService.findOneById(contractId);
      debugger;
    });
  }

  execute() {
    this.contractsService.executeOneById(this.contract._id);
  }
}
