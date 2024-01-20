import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  links = [
    {path: '/countries', title: 'Страны'},
    {path: '/cities', title: 'Города'}
  ];
  activeLink = this.links[0];

  ngOnInit() {
  }

}
