import { TuiRootModule } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CitiesComponent } from './components/cities/Cities.component';
import { CountriesComponent } from './components/countries/Countries.component';
import { HeaderComponent } from './components/UI/header/Header.component';
import {MatTabsModule} from '@angular/material/tabs'
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from './components/dialog/Dialog.component';
import { EditDialogComponent } from './components/editDialog/EditDialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    CountriesComponent,
    HeaderComponent,
    DialogComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatRadioModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('ru');
  }
}
