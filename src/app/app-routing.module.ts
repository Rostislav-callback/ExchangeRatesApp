import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';

const routes: Routes = [
  {
    path: ' ',
    component: ExchangeRatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
