import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { CurrencyService } from '../service/currency.service';


@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})

export class CoinListComponent implements OnInit{

  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  banerData: any;
  currency:string = 'PLN';

  constructor(private api:ApiService, private currentRoute:Router, private currencyService:CurrencyService){}

  ngOnInit(): void {
    this.getBannerData();
    this.getAllData();
    this.currencyService.getCurrency().subscribe( val =>
      {this.currency=val;
        this.getBannerData();
        this.getAllData();
      }
    );
  }

  getBannerData(){
    this.api.getTrendingCurrency(this.currency).subscribe(res => {
      this.banerData = res;  
      console.log(this.banerData)
    });
   
  }

  getAllData(){
    this.api.getCurrency(this.currency).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
      console.log(this.dataSource);
    });
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToDetails(row:any){
    this.currentRoute.navigate(['coin-detail',row.id]);
  }


}

