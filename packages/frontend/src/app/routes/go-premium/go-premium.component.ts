import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-go-premium',
  templateUrl: './go-premium.component.html',
})
export class GoPremiumComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() {
  }


}
