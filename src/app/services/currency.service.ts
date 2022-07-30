import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  public currency = { symbol: 'USD', value: 1 }

  currency$: BehaviorSubject<any> = new BehaviorSubject<any>(this.currency)

  constructor(private cookieService: CookieService, private http: HttpClient) {

  }

  setCurrency(symbol: string, value: number): void {
    const data = {
      symbol,
      value
    }

    this.cookieService.set('__currency', JSON.stringify({ symbol, value }), 1, '/')

    this.currency$.next(data)//TODO Divulgar en toda la aplicación !! ✔✔
  }

  getCurrencies(): Observable<any> {
    return this.http.get('https://v1.nocodeapi.com/leifermendez/cx/EWBnLVhPRyGHNdDn/rates')
  }


}
