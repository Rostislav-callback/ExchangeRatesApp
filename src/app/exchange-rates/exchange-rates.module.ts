import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { ExchangeRatesComponent } from './exchange-rates.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangeRatesComponent
  }
];

@NgModule({
  declarations: [
    ExchangeRatesComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule ,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ExchangeRatesModule { }
