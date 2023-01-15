import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CryptoApp';
  selectedCurrency: string = 'PLN';

  constructor(){

  }

  sendCurrency(event:string): void {
    console.log(event);
  }
}
