import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
})
export class ContractsComponent implements OnInit {
  constructor(private http: _HttpClient) {}

  ngOnInit() {}

  onClickButton() {
    alert('Hello!');
  }
}
