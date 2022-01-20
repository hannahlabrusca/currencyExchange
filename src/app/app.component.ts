import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { CurrencyServiceService } from './currency-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'currencyExchange';
  currenciesArray: string[] = [];
  sCurr1: string = '';
  sCurr2: string = '';
  nCurr1: any = null;
  nCurr2: any = null;
  curr1Val: number = 0;
  curr2Val: number = 0;
  basicCurrency: number = 0;

  constructor(private _currencyService: CurrencyServiceService) {}

  ngOnInit() {
    /**
     * fetch currencies on page load
     */
    this._currencyService.fetchCurrencies();
    /**
     * Sets currency array to be displayed on dropdown box
     */
    this._currencyService.currencies.subscribe(currencies => {
      if (Object.keys(currencies).length > 0) {
        this.currenciesArray = Object.keys(currencies);
      }
    });
  }

  /**
   * Detects changes on top input box
   * Automatically converts currency
   */
  currency1Change() {
    this.nCurr2 = this._currencyService.convertCurrencies(this.nCurr1, this.curr1Val, this.curr2Val);
  }

  /**
   * Detects changes on bottom input box
   * Automatically converts currency
   */
  currency2Change() {
    this.nCurr1 = this._currencyService.convertCurrencies(this.nCurr2, this.curr2Val, this.curr1Val);
  }

  /**
   * Sets currency name to be displayed on selected item from dropdown
   * Sets base value of selected currency
   * @param curr 
   */
  setCur1(curr: string) {
    this.sCurr1 = curr;
    this.nCurr1 = null;
    this.nCurr2 = null;
    this.curr1Val = this._currencyService.getCurrencyValue(curr);
    this.nCurr1 = ((this.nCurr2 === 0) || (this.nCurr2 === null)) ? 1 : this.curr1Val;
  }

  /**
   * Sets currency name to be displayed on selected item from dropdown
   * Sets base value of selected currency
   * @param curr 
   */
  setCur2(curr: string) {
    this.sCurr2 = curr;
    this.nCurr1 = null;
    this.nCurr2 = null;
    this.curr2Val = this._currencyService.getCurrencyValue(curr);
    this.nCurr2 = ((this.nCurr1 === 0) || (this.nCurr1 === null)) ? 1 : this.curr2Val;
    this.basicCurrency = this._currencyService.basicConversion(this.curr1Val, this.curr2Val);
  }
}
