import { Component, OnInit } from '@angular/core';
import { ContractsService } from '@shared/contracts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
})
export class ContractsComponent implements OnInit {
  contracts: any[];
  constructor(private contractsService: ContractsService, private router: Router) { }

  async ngOnInit() {
    return this.refresh();
  }

  async refresh() {
    this.contracts = await this.contractsService.findAll();
  }


  isVisible = false;

  showModal(contract: any): void {
    this.isVisible = true;
    this.contractToDelete = contract;
  }

  async handleOk() {
    console.log('Button ok clicked!');
    await this.contractsService.deleteOneById(this.contractToDelete._id);
    this.isVisible = false;
    this.refresh();

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  async createContract() {
    const createdContract = await this.contractsService.createContract({
      name: 'New Contract',
      conditions: [],
      accounts: [],
      actions: [
        {
          type: 'e-mail',
          data: {
            toEmail: 'ralph.greschner.dev@gmail.com',
            subject: 'Geile Sache',
            text: `=Transaktion '{{$node["Start"].data.paymentReference}}' am {{$node["Start"].data.valueDate}} ÃƒÂ¼ber {{$node["Start"].data.amount}} EUR.`,
          },
        },
      ],
    });
    this.router.navigate(['/contracts', createdContract._id]);
  }

  contractToDelete: any;
}
