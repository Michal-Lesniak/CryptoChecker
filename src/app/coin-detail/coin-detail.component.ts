import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit{
  currency: string = "PLN";
  coinData: any;
  coinId!: number;
  currentPrice!: number;
  marketCap!: number;
  days: number = 1;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;
  constructor(private http:HttpClient, private activatedRoute:ActivatedRoute, private api:ApiService, private currencyService:CurrencyService){
  
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (val:any) => {
        this.coinId = val.id;
      }
    )
  
    this.getCoinData();
    this.getGraphData(this.days);

    
    this.currencyService.getCurrency().subscribe( val => {
      this.currency = val;
      this.getCoinData();
      this.getGraphData(this.days);
    })
  }

  getCoinData(){
    this.api.getCurrencyById(this.coinId).subscribe(
      (val:any) => {
        this.coinData = val;
        console.log(this.coinData);
    })
  }

  getGraphData(days:number){
    this.days = days;
    this.api.getGrpahicalCurrencyData(this.coinId,this.currency,this.days).subscribe( res => {
      setTimeout(()=>{
        this.myLineChart.chart?.update();
      },100);
      this.lineChartData.datasets[0].data = res.prices.map((val:any) =>{
        return val[1];
      }
        );
      this.lineChartData.labels = res.prices.map((val:any) => {
        let date = new Date(val[0]);
        let time = `${date.getHours()}:${date.getMinutes()}`;
        return this.days === 1 ? time : date.toLocaleDateString();
      })
    }
      
      )
  }

  setMarketPrice(){
    switch(this.currency){
      case 'PLN':
        return this.currentPrice = this.coinData?.market_data.current_price.pln;
        this.marketCap = this.coinData?.market_data.market_cap.pln;
      break;
      case 'USD':
        return this.currentPrice =  this.coinData?.market_data.current_price.usd;
        this.marketCap = this.coinData?.market_data.market_cap.usd;
        break;
      case 'EUR':
        return this.currentPrice = this.coinData?.market_data.current_price.eur;
        this.marketCap = this.coinData?.market_data.market_cap.eur;
        break;
    }
  }

  setMarketCap(){
    switch(this.currency){
      case 'PLN':
        return this.marketCap = this.coinData?.market_data.market_cap.pln;
      break;
      case 'USD':
        return this.marketCap = this.coinData?.market_data.market_cap.usd;
        break;
      case 'EUR':
        return this.marketCap = this.coinData?.market_data.market_cap.eur;
        break;
    }
  }

}
