import { Component} from '@angular/core';
import { CurrencyService } from './service/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CryptoApp';
  selectedCurrency: string = 'PLN';

  constructor(private currencyService:CurrencyService){

  }

  sendCurrency(event:string): void {
    this.selectedCurrency = event;
    this.currencyService.setCurrency(this.selectedCurrency);
  }
}
