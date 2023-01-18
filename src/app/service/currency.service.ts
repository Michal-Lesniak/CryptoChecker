import { getCurrencySymbol } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currency: BehaviorSubject<string> = new BehaviorSubject("PLN");

  constructor() { }

  setCurrency(currency:string){
    this.currency.next(currency);
    console.log(currency);
  }

  getCurrency(){
    return this.currency.asObservable();
  }
}
