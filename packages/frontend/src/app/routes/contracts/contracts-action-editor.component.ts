import { Component, OnInit, Input, NgZone, ChangeDetectorRef } from '@angular/core';
import { AccountsService } from '@shared/accounts.service';

@Component({
  selector: 'app-contracts-action-editor',
  templateUrl: './contracts-action-editor.component.html',
  styles: [],
})
export class ContractsActionEditorComponent implements OnInit {

constructor(private accountsService: AccountsService) {

}

internalAccounts: any[] = [];

  async ngOnInit() {
    this.internalAccounts = await this.accountsService.findAll();
    debugger;
  }
  refreshActions() {
    this.actions = [...this.contract.actions];
  }

  private _contract: any;

  actions: any[];

  @Input()
  public set contract(contract: any) {
    this._contract = contract;
    this.refreshActions();
  }

  public get contract() {
    return this._contract;
  }

  removeAction(action: any) {
    const index = this.contract.actions.indexOf(action);
    this.contract.actions.splice(index, 1);
    this.refreshActions();
  }

  addAction() {
    const NEW_ACTION = {
      type: 'noop',
      data: {},
    };
    this.contract.actions.push(NEW_ACTION);
    this.refreshActions();
  }

  validActionTypes = [
    { value: 'noop', label: 'Dummy', disabled: true },
    { value: 'e-mail', label: 'Send E-Mail' },
    { value: 'internal-transfer', label: 'Internal Transfer' },
    { value: 'wire-transfer', label: 'Wire Transfer' },
  ];

  onActionTypeChanged(action) {
    action.data = {};
  }
  
}
