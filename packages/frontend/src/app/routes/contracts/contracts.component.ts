import { Component, OnInit } from '@angular/core';
import { ContractsService } from '@shared/contracts.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
})
export class ContractsComponent implements OnInit {
  contracts: any[];
  constructor(private contractsService: ContractsService) {}

  async ngOnInit() {
    this.contracts = await this.contractsService.findAll();
  }
}
