import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetRatesService } from './services/get-rates.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentRates$!: Observable<any>;

  constructor(private getRates: GetRatesService) { }

  ngOnInit(): void {
    this.currentRates$ = this.getRates.getRatesForHeader();
  }
}
