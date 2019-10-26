import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { ContractsComponent } from './contracts/contracts.component';
import { AccountsComponent } from './accounts/accounts.component';
import { SingleAccountComponent } from './accounts/single-accounts.component';
import { SingleContractComponent } from './contracts/single-contract.component';
import { ContractsActionEditorComponent } from './contracts/contracts-action-editor.component';
import { ContractsConditionEditorComponent } from './contracts/contracts-condition-editor.component';

const COMPONENTS = [
  DashboardComponent,
  ContractsComponent,
  SingleContractComponent,
  AccountsComponent,
  SingleAccountComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT, ContractsActionEditorComponent, ContractsConditionEditorComponent],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
