import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CurrencyServiceService } from './currency-service.service';

describe('CurrencyServiceService', () => {
  let service: CurrencyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyServiceService]
    });
    service = TestBed.inject(CurrencyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#currencies should return observable',
    (done: DoneFn) => {
    service.currencies.subscribe(value => {
      expect(value).toEqual({ });
      done();
    });
  });

  it('#fetchCurrencies function should be created', () => {
    expect(service.fetchCurrencies).toBeTruthy();
   });

  it('#convertCurrencies should return a number', () => {
    expect(service.convertCurrencies(1, 1, 1)).toEqual(1);
  });

  it('#basicConversion should return a number', () => {
    expect(service.basicConversion(1, 1)).toEqual(1);
  });

});
