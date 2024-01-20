import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './components/cities/Cities.component';
import { CountriesComponent } from './components/countries/Countries/Countries.component';

const routes: Routes = [
  {path: 'cities', component: CitiesComponent},
  {path: 'countries', component: CountriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
