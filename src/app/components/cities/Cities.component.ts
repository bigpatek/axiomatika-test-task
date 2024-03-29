import { CountriesService } from './../../services/Countries.service';
import { Subscription } from 'rxjs';
import { CitiesService } from './../../services/Cities.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/Dialog.component';
import { EditDialogComponent } from '../editDialog/EditDialog.component';
import { LangService } from '../../services/Lang.service';
import { TranslateService } from '@ngx-translate/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-Cities',
  templateUrl: './Cities.component.html',
  styleUrls: ['./Cities.component.css']
})
export class CitiesComponent implements OnInit {

  mm: string;
  k: string;
  ppl: string;

  constructor(private CitiesService: CitiesService, private CountriesService: CountriesService, private translate: TranslateService, public dialog: MatDialog) {
    this.translate.stream('CITIES.mm').subscribe(val => {
      this.mm = val;
    });
    this.translate.stream('CITIES.k').subscribe(val => {
      this.k = val;
    });
    this.translate.stream('CITIES.ppl').subscribe(val => {
      this.ppl = val;
    });

  }

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
        return `${Math.round(population/1000)} ${this.k}`
    }
    if(population > 1000000){
        return `${(population/1000000).toFixed(3)} ${this.mm}`
    }
    if(population < 1000){
        return `${population} ${this.ppl}`
    }
    else return `${population} ${this.k}`
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

  openDescriptionDialog(city: any){
    let name = city.name;
    let country = city.country;
    let region = city.region;
    let latitude = city.latitude;
    let longitude = city.longitude;
    let population = city.population;
    let date = city.date ? city.date : "";
    this.dialog.open(DialogComponent, {
      data: {
        name,
        country,
        region,
        latitude,
        longitude,
        population,
        date
      }
    })
  }

  editForm: any = {
    date: "",
    region: "",
    latitude: "",
    longitude: "",
    population: ""
  }


  openEditDiscriptionDialog(city: any){
    let name = city.name;
    let country = city.country;
    this.editForm.region = city.region;
    this.editForm.latitude = city.latitude;
    this.editForm.longitude = city.longitude;
    this.editForm.population = city.population;
    this.editForm.date = city.date ? city.date : "";
    let populationFormControl = new FormControl(this.editForm.population, [Validators.pattern(/^[1-9]\d*$/)]);
    let longitudeFormControl = new FormControl(this.editForm.longitude, [Validators.pattern(/-?\d+/)]);
    let latitudeFormControl = new FormControl(this.editForm.latitude, [Validators.pattern(/^-?[0-9][0-9,\.]+$/)]);
    let matcher = new MyErrorStateMatcher();
    const dialogRef = this.dialog.open(EditDialogComponent,{
      data: {
        name,
        country,
        editForm: this.editForm,
        populationFormControl,
        longitudeFormControl,
        latitudeFormControl,
        matcher
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.editForm.population.invalid)
      if(result === true){
        let index = this.dataSource.map( (el: any )=> el.wikiDataId ).indexOf(city.wikiDataId);
        this.dataSource[index].region = this.editForm.region;
        this.dataSource[index].population = this.editForm.population;
        this.dataSource[index].latitude = this.editForm.latitude;
        this.dataSource[index].longitude = this.editForm.longitude;
        this.dataSource[index].date = this.editForm.date;
      }
    })
  }

}
