import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyServiceService {
  private readonly currencyApi = environment.currencyApi;
  private readonly accessKey = environment.access_key;
  private _currencySubject: BehaviorSubject<{}> = new BehaviorSubject({});

  constructor(
    private readonly _http: HttpClient
  ) { }

  /**
   * API call to fetch currencies
   */
  fetchCurrencies() {
    this._http.get(`${this.currencyApi}access_key=${this.accessKey}`)
    .subscribe((data: any) => {
      /**
       * save curriencies as behavior subject
       */
      this._currencySubject.next(data.rates);
    });
  }

  /**
   * returns currency subject as an observable
   * this is to ensure that components that subscribes to this service
   * would get the latest currencies
   */
  get currencies() {
    return this._currencySubject.asObservable();
  }

  /**
   * main logic on currency conversion
   * returns converted currency value
   * @param param - user input currency
   * @param param1 - base value of 1st currency
   * @param param2 - base value of 2nd currency
   * @returns 
   */
  convertCurrencies(param: number, param1: number, param2: number) {
    let convertedCurrency = param * (param2/param1);
    return convertedCurrency;
  }

  basicConversion(param1: number, param2: number) {
    let convert = (param2/param1);
    return convert; 
  }

  /**
   * Returns the base currency value of selected currency
   * @param currencySymbol 
   * @returns 
   */
  getCurrencyValue = (currencySymbol: string) => {
    const currencies = this._currencySubject.value as any;
    const currencyValue = currencies[currencySymbol];

    return currencyValue;
  }

}
