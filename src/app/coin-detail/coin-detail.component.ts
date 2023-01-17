import { Component, OnInit   } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit{
  currency: string = "PLN";
  coinData: any;
  coinId!: string;


  constructor(private http:HttpClient, private activatedRoute:ActivatedRoute, private api:ApiService){
  
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (val:any) => {
        this.coinId = val.id;
      }
    )

    this.getCoinData();
  }

  getCoinData(){
    this.api.getCurrencyById(this.coinId).subscribe(
      (val:any) => {
        this.coinData = val;
        console.log(this.coinData);
    })
  }

}
