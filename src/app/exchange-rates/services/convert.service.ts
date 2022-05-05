import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { environment } from "src/environments/environment";
import { map, Observable } from 'rxjs';
import { GetRatesResponseInterface } from '../interfaces/getRatesResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {
  constructor(private http: HttpClient) { }

  getSymbols(): Observable<string[]> {
    const url = environment.apiUrl;

    return this.http.get<GetRatesResponseInterface>(url).pipe(
      map((data: GetRatesResponseInterface) => {
        return Object.keys(Object(data).rates).sort();  
      })
    )
  }

  convertToValues(to: string, from: string, amount: string): Observable<number> {
    const url = environment.apiUrl;
    
    return this.http.get<GetRatesResponseInterface>(url).pipe(
      map((data: GetRatesResponseInterface) => {
        const allRates = Object(data).rates;        
        const resultValue = (allRates[to] / allRates[from]) * Number(amount);
        
        return resultValue;
      })
    )
  } 

  convertFromValues(to: string, from: string, amount: string): Observable<number> {
    const url = environment.apiUrl;
    
    return this.http.get<GetRatesResponseInterface>(url).pipe(
      map((data: GetRatesResponseInterface) => {
        const allRates = Object(data).rates;
        const resultValue = (allRates[from] / allRates[to]) * Number(amount);

        return resultValue;
      })
    )
  }
}
