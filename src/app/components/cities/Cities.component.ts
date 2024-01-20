import { CountriesService } from './../../services/Countries.service';
import { Subscription } from 'rxjs';
import { CitiesService } from './../../services/Cities.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-Cities',
  templateUrl: './Cities.component.html',
  styleUrls: ['./Cities.component.css']
})
export class CitiesComponent implements OnInit {

  constructor(private CitiesService: CitiesService, private CountriesService: CountriesService) { }

  displayedColumns: string[] = ['Country', 'name', 'Region', 'Population', 'Btns'];

  citiesSubscription: Subscription;
  countriesSubsription: Subscription;

  countriesData: any;
  dataSource: any;
  totalCount: number;
  limit: number = 5;
  pageSizeOptions = [6, 8, 10];
  pageSize = 6;
  page: number = 0;
  inputValue: string ="";
  selected: string;

  selectedCountry: any;

  ngOnInit(): void {
    this.selectedCountry = this.CountriesService.selectedCountry;
    if(this.selectedCountry){
      this.selected = this.selectedCountry.wikiDataId;
      this.onSelect();
      this.fetchCountries();
    }
    else{
      this.fetchCities();
      this.fetchCountries();
    }
  }

  fetchCities(): void{
    console.log(this.selectedCountry)
    this.citiesSubscription = this.CitiesService.getCities(this.page*this.pageSize, this.pageSize).subscribe((data) => {
      this.dataSource = data.data;
      this.totalCount = data.metadata.totalCount;
    });
  }

  fetchCountries(): void{
    this.countriesSubsription = this.CountriesService.getCountries(this.page*10, 10).subscribe((data) => {
      this.countriesData = data.data;
      console.log(this.countriesData)
      if(this.selected){
        if(!this.countriesData.some((obj: any) => obj.wikiDataId === this.selectedCountry.wikiDataId)){
          this.countriesData[0] = this.selectedCountry;
        }
      }
    });
    
  }

  onTableDataChange(event: any) {

    this.page = event.pageIndex;
    this.pageSize = event.pageSize;

    if(this.selected){
      this.citiesSubscription = this.CitiesService.getCityByCountryId(this.page*this.pageSize, this.pageSize, this.selected).subscribe((data) => {
        this.dataSource = data.data;
        this.totalCount = data.metadata.totalCount;
      })
      if(this.inputValue){
        this.citiesSubscription = this.CitiesService.getCityByCountryId(this.page*this.pageSize, this.pageSize, this.selected, this.inputValue).subscribe((data) => {
          this.dataSource = data.data;
          this.totalCount = data.metadata.totalCount;
        })
      }
    }
    else if(this.inputValue){
      this.citiesSubscription = this.CitiesService.searchCity(this.inputValue, this.page*this.pageSize, this.pageSize).subscribe((data) => {
        this.dataSource = data.data;
        this.totalCount = data.metadata.totalCount;
      });
    }
    else{
      this.fetchCities();
    }    
  }  

  onSearch(event: any){
    this.page = 0;
    this.inputValue = event.target.value;
    if(this.selected){
      this.citiesSubscription = this.CitiesService.getCityByCountryId(this.page*this.pageSize, this.pageSize, this.selected, this.inputValue).subscribe((data) => {
        this.dataSource = data.data;
        this.totalCount = data.metadata.totalCount;
      })
    }
    else{
      this.citiesSubscription = this.CitiesService.searchCity(this.inputValue, this.page*this.pageSize, this.pageSize).subscribe((data) => {
        this.dataSource = data.data;
        this.totalCount = data.metadata.totalCount;
      });
    }
  }

  formatedPopulation(population: number){
    if(population > 10000 && population < 1000000){
        return `${Math.round(population/1000)} тыс.`
    }
    if(population > 1000000){
        return `${(population/1000000).toFixed(3)} млн.`
    }
    if(population < 1000){
        return `${population} чел.`
    }
    else return `${population} тыс.`
  }

  onSelect(){
    if(!this.selected){
      this.CountriesService.selectedCountry = {};
      this.fetchCities();
      this.fetchCountries();
    }
    else{
      this.page = 0;
      this.citiesSubscription = this.CitiesService.getCityByCountryId(this.page*this.pageSize, this.pageSize, this.selected).subscribe((data) => {
        this.dataSource = data.data;
        this.totalCount = data.metadata.totalCount;
    })
    }
  }
}
