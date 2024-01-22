import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

public langs = ["RU", "EN"];
public activeLang = this.langs[0];

constructor() { }

changeLang(e : any){
  this.activeLang = e.value; 
  console.log(this.activeLang)
}

}






