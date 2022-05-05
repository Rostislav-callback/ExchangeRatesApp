import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from "@angular/forms";

import { distinctUntilChanged, Observable, switchMap, tap } from 'rxjs';
import { ConvertionFormDataInterface } from './interfaces/convertionFormData.interface';

import { ConvertService } from './services/convert.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  @ViewChild('resultValue', {static: false}) resultValue!: ElementRef;
  @ViewChild('amountValue', {static: false}) amountValue!: ElementRef;

  initValues: ConvertionFormDataInterface = {
    valueBefore: '',
    rateFrom: 'USD',
    valueAfter: '',
    rateTo: 'UAH'
  };
  
  validators = [Validators.required];
  convertForm!: FormGroup;
  formValue$!: Observable<any>;
  formAmountValue$!: Observable<any>;
  formResultValue$!: Observable<any>;
  allRates$!: Observable<string[]>;

  constructor(private fb: FormBuilder, private convertService: ConvertService) { }

  ngOnInit(): void {
    this.fetchRates();
    this.initForm();
    this.formFieldAmountValue();
    this.formFieldResultValue();
    this.formValueChanges();
  }

  fetchRates(): void {
    this.allRates$ = this.convertService.getSymbols();
  }

  formFieldAmountValue(): void {
    this.formAmountValue$ = this.convertForm.get('valueBefore')!.valueChanges.pipe(
      switchMap((data: string) => {
        if (this.convertForm.valid) {
          return this.convertService
            .convertToValues(this.convertForm.value.rateTo, this.convertForm.value.rateFrom, data)
            .pipe(
              tap(res => {
                this.resultValue.nativeElement.value = res.toFixed(2);
              })
            )
        }
        
        return new Observable();
       }
      )
    )
  }

  formFieldResultValue(): void {
    this.formResultValue$ = this.convertForm.get('valueAfter')!.valueChanges.pipe(
      switchMap((data: string) => {
        if (this.convertForm.valid && this.convertForm.get('valueAfter')?.value !== '0') {
          return this.convertService
            .convertFromValues(this.convertForm.value.rateTo, this.convertForm.value.rateFrom, data)
            .pipe(
              tap(res => {
                this.amountValue.nativeElement.value = res.toFixed(2);
              })
            )
        }
        
        return new Observable();
       }
      )
    )
  }

  formValueChanges(): void {
    this.formValue$ = this.convertForm.valueChanges.pipe(
      distinctUntilChanged(
        (prev: ConvertionFormDataInterface, curr: ConvertionFormDataInterface) => {
          return prev.rateTo === curr.rateTo && prev.rateFrom === curr.rateFrom
      }),
      switchMap((data: ConvertionFormDataInterface) => {
        if (this.convertForm.valid) {
          return this.convertService
            .convertToValues(data.rateTo, data.rateFrom, data.valueBefore)
            .pipe(
              tap(res => {
                this.resultValue.nativeElement.value = res.toFixed(2);
              })
            )
        }
        
        return new Observable();
       }
      )
    )
  }

  private initForm() {
    this.convertForm = this.fb.group({
      valueBefore: this.initValues.valueBefore,
      rateFrom: [this.initValues.rateFrom, ...this.validators],
      valueAfter: this.initValues.valueAfter,
      rateTo: [this.initValues.rateTo, ...this.validators]
    })
  }
}
