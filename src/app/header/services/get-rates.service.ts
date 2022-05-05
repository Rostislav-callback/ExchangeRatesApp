import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetRatesResponseInterface } from 'src/app/exchange-rates/interfaces/getRatesResponse.interface';
import { RatesForHeader } from '../interfaces/ratesForHeader.interface';

@Injectable({
  providedIn: 'root'
})
export class GetRatesService {
  constructor(private http: HttpClient) { }

  getRatesForHeader(): Observable<RatesForHeader> {
    const url = environment.apiUrl;

    return this.http.get<GetRatesResponseInterface>(url).pipe(
      map((data: GetRatesResponseInterface) => {
        const rates = Object(data).rates;
        const result: RatesForHeader = {
          usd: rates.UAH,
          eur: rates.UAH/rates.EUR
        };
      
        return result;  
      })
    )
  }
}
