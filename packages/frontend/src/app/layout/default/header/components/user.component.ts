import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'header-user',
  template: `
    <div
      class="alain-default__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <nz-avatar nzSrc="/assets/supergeil.jpg" nzSize="small" class="mr-sm"></nz-avatar>
      Ralph
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
      <div nz-menu-item>
      <div style="width: 140px !important; height: 140px !important: border-radius: 4px;">
      <img width="140" height="140" src="/assets/supergeil.jpg"/>
      </div>
    </div>
        <div nz-menu-item routerLink="/pro/account/center">
          <i nz-icon nzType="user" class="mr-sm"></i>
          My Profile
        </div>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'menu.account.logout' | translate }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url!);
  }
}
