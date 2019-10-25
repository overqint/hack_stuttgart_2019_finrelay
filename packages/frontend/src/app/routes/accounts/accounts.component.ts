import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
})
export class AccountsComponent implements OnInit {
  constructor(private http: _HttpClient) {}

  ngOnInit() {}

  onClickButton() {
    alert('Hello!');
  }
}
