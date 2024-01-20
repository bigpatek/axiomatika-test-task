import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
}

)
export class CitiesService {

    url: string = 'http://geodb-free-service.wirefreethought.com/v1/geo/cities'; 

    constructor(private http: HttpClient) { }   

    getCities(page: number = 0, limit: number = 6){
        return this.http.get<any>(`${this.url}?offset=${page}&limit=${limit}`);
    }   

    getCity(id: number){  
        return this.http.get<any>(`${this.url}/${id}`);
    }

    getCityByCountryId(page: number = 0, limit: number = 6, countryId: string, name: string = ''){
        return this.http.get<any>(`${this.url}?offset=${page}&limit=${limit}&countryIds=${countryId}&namePrefix=${name}`);
    }

    searchCity(name: string, page: number = 0, limit: number = 6){
        return this.http.get<any>(`${this.url}?namePrefix=${name}&offset=${page}&limit=${limit}`);
    }
    
}