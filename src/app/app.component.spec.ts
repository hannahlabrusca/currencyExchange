import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CurrencyServiceService } from './currency-service.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AppComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`#currencyExchange title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('currencyExchange');
  });

  it(`#currenciesArray variable`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currenciesArray).toEqual([ ]);
  });

  it('should call fetchCurrencies() after Angular calls ngOnInit', () => {
    let comp = TestBed.inject(AppComponent);
    comp.ngOnInit();
    // expect(mockService.fetchCurrencies()).toContain({'rates': {'USD': 1.133382}});
  });
});
