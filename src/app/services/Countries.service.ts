import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {


    url: string = 'http://geodb-free-service.wirefreethought.com/v1/geo/countries';

    public selectedCountry: Object;

    constructor(private http: HttpClient) { 

    }

    getCountries(page: number = 0, limit: number = 6, name: string =  ""){
      return this.http.get<any>(`${this.url}?offset=${page}&limit=${limit}&namePrefix=${name}`);
    }

    searchCountries(name: string, page: number = 0, limit: number = 6){
      return this.http.get<any>(`${this.url}?namePrefix=${name}&offset=${page}&limit=${limit}`);
    }

    changeSelectedCountry = (country: Object) => {
      this.selectedCountry = country;
    }

}
