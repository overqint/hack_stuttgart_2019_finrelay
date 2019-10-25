import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-account',
  templateUrl: './single-account.component.html',
})
export class SingleAccountComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });
  }

  onClickButton() {
    alert('Hello!');
  }

  accountId: string;
}
