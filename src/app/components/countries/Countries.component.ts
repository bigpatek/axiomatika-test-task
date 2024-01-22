import { Subscription } from 'rxjs';
import { CountriesService } from '../../services/Countries.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-Countries',
  templateUrl: './Countries.component.html',
  styleUrls: ['./Countries.component.css'],
})
export class CountriesComponent implements OnInit {

  constructor(private CountriesService: CountriesService, private router: Router, private translate: TranslateService) { }

  displayedColumns: string[] = ['CountryID', 'name', 'CountryCode', 'CountryCurrency'];

  countriesSubsription: Subscription;

  dataSource: any;
  totalCount: number;
  limit: number = 5;
  pageSizeOptions = [6, 8, 10];
  pageSize = 6;
  page: number = 0;
  inputValue: string ="";


  ngOnInit() {
    this.fetchCountries();
  }

  fetchCountries(): void{
    this.countriesSubsription = this.CountriesService.getCountries(this.page*this.pageSize, this.pageSize).subscribe((data) => {
      this.dataSource = data.data;
      this.totalCount = data.metadata.totalCount;
    });
  }

  onTableDataChange(event: any) {

    this.page = event.pageIndex;
    this.pageSize = event.pageSize;

    if(this.inputValue){
      
      this.countriesSubsription = this.CountriesService.searchCountries(this.inputValue, this.page*this.pageSize, this.pageSize).subscribe((data) => {
        this.dataSource = data.data;
        this.totalCount = data.metadata.totalCount;
      });
      console.log(this.dataSource)
    }
    else{
      this.fetchCountries();
    }
  }


  onSearch(event: any){
      this.inputValue = event.target.value;
      this.page = 0;
      this.countriesSubsription = this.CountriesService.searchCountries(this.inputValue, this.page*this.pageSize, this.pageSize).subscribe((data) => {
      this.dataSource = data.data;
      this.totalCount = data.metadata.totalCount;
    })
  }

  formatedCurrencyCodes(currencyCodes: any){
    return currencyCodes.join(', ');
  }

  changeSelectedCountry = (country: Object) => {
    this.CountriesService.changeSelectedCountry(country);
    this.router.navigate(['/cities']);
  }

}
