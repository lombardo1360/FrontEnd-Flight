import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currencies: Array<any> = []

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.getCurrencies()
  }

  setCurrency(symbol: string, value: number): void {
    this.currencyService.setCurrency(symbol, value)
  }

  getCurrencies(): void {
    this.currencyService.getCurrencies().subscribe(({ rates }) => {

      this.currencies = Object.values(rates).map((value: any, index: number) => {
        return {
          symbol: Object.keys(rates)[index],
          value
        }
      })
    })
  }
}
