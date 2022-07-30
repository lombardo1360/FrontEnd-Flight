import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../services/currency.service';

@Pipe({
  name: 'currencyChangePipe',
  pure: false
})
export class CurrencyChangePipe implements PipeTransform, OnDestroy {

  public value: string = ''
  private listen$: Array<Subscription> = []

  constructor(private currencyService: CurrencyService) {  }


  transform(valueIn: number): any {
    const observer1$ = this.currencyService.currency$
    .subscribe(({ symbol, value }) => {

      this.value = `${(valueIn * value).toFixed(2)} ${symbol}`
    })

  this.listen$ = [observer1$]

  return this.value
  }

  ngOnDestroy(): void {
    this.listen$.forEach(a => a.unsubscribe())
  }

}
