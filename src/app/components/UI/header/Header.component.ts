import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../services/Countries.service';
import { LangService } from '../../../services/Lang.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private LangService: LangService, public translate: TranslateService) { }

  public langs = this.LangService.langs;
  public activeLang = this.LangService.activeLang;

  public links = [
    {path: '/countries', title: 'Страны'},
    {path: '/cities', title: 'Города'}
  ];
  
  public activeLink = this.links[0];

  ngOnInit() {
  }

  changeLang = this.LangService.changeLang;
}
