import { Component, OnInit, Input, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contracts-action-editor',
  templateUrl: './contracts-action-editor.component.html',
  styles: [],
})
export class ContractsActionEditorComponent {
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
    'noop',
    "e-mail",
    "wire-transfer"
  ]

  onActionTypeChanged(action) {
    action.data = {};
  }
  
}
