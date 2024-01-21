import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../services/Countries.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  public links = [
    {path: '/countries', title: 'Страны'},
    {path: '/cities', title: 'Города'}
  ];
  
  public activeLink = this.links[0];

  ngOnInit() {
  }

}
