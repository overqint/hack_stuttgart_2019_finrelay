import { Component, OnInit, Input, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contracts-condition-editor',
  templateUrl: './contracts-condition-editor.component.html',
  styles: [],
})
export class ContractsConditionEditorComponent {
  refreshConditions() {
    this.conditions = [...this.contract.conditions];
  }

  private _contract: any;

  conditions: any[];

  @Input()
  public set contract(contract: any) {
    this._contract = contract;
    this.refreshConditions();
  }

  public get contract() {
    return this._contract;
  }

  removeCondition(condition: any) {
    const index = this.contract.conditions.indexOf(condition);
    this.contract.conditions.splice(index, 1);
    this.refreshConditions();
  }

  addCondition() {
    const NEW_CONDITION = {
      type: 'check-amount',
      data: {operation: 'eq'},
    };
    this.contract.conditions.push(NEW_CONDITION);
    this.refreshConditions();
  }

  validConditionTypes = [
    {value: 'noop', label: "Dummy", disabled: true},
    {value:"check-amount", label: "Amount is"},
    {value:"account-iban-equals", label: "Counter Party IBAN equals"},
    {value:'counter-party-name-contains', label: "Counter Party Name contains"},
  ]

  onConditionTypeChanged(condition) {
    condition.data = {};
  }
  
}
