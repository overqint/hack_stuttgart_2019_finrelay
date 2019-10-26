import { Component, OnInit } from '@angular/core';
import { ContractsService } from '@shared/contracts.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
})
export class ContractsComponent implements OnInit {
  contracts: any[];
  constructor(private contractsService: ContractsService) { }

  async ngOnInit() {
    this.contracts = await this.contractsService.findAll();
  }

  isVisible = false;

  showModal(contract: any): void {
    this.isVisible = true;
    this.contractToDelete = contract;
  }

  async handleOk() {
    console.log('Button ok clicked!');
    //debugger;
    await this.contractsService.deleteOneById(this.contractToDelete._id);
    this.isVisible = false;

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  contractToDelete: any;
}
