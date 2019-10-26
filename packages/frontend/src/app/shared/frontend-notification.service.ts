import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class FrontendNotificationService {
  constructor(private notification: NzNotificationService) {}

  create(...args) {
    this.notification.create.call(this.notification, ...args);
  }
}
