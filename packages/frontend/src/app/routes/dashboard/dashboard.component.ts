import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private http: _HttpClient) {}

  ngOnInit() {}

  onClickButton() {
    alert('Hello!');
  }
  deadline = Date.now() + 200000 * 60 * 60 * 24 * 2 + 1000 * 30;

  listDataMap = {
    eight: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
    ],
    ten: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' },
    ],
    eleven: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' },
    ],
  };

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
}
