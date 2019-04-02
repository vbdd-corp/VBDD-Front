import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login';
import {HomeBriComponent} from './bris/home';
import {HomeStdComponent} from './students/home';
import {PriseRdvComponent} from './students/prise-rdv';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'homeBri', component: HomeBriComponent},
  {path: 'homeStd', component: HomeStdComponent},
  {path: 'priseRdvStd', component: PriseRdvComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {path: '404', redirectTo: '/login'},
  {path: '*', redirectTo: '/login'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
