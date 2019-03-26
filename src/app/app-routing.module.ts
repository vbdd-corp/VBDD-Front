import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login';
import {HomeBriComponent} from './bris/home';
import {HomeStdComponent} from './students/home';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'homeBri', component: HomeBriComponent},
  {path: 'homeStd', component: HomeStdComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
