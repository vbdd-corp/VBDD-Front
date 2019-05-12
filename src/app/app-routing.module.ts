import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login';
import {HomeStdComponent} from './students/home';
import {PriseRdvComponent} from './students/prise-rdv';
import {EditComponent} from './reports/edit/edit.component';
import {NewReportComponent} from './reports/new/new.component';
import {ReportCheckerComponent} from './bri/report-checker/report-checker.component';
import {ReportsFiltererComponent} from './bri/reports-filterer/reports-filterer.component';
import {AvailabilityBriComponent} from './bri/availability-bri/availability-bri.component';
import {PlanningBriComponent} from './bri/planning-bri/planning-bri.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'homeStd', component: HomeStdComponent},
  {path: 'reportChecker', component: ReportCheckerComponent},
  {path: 'reportsFilterer', component: ReportsFiltererComponent},
  {path: 'availability', component: AvailabilityBriComponent},
  {path: 'planning', component: PlanningBriComponent},
  {path: 'priseRdvStd', component: PriseRdvComponent},
  {path: 'reports/edit/:id', component: EditComponent},
  {path: 'reports/new/:type/:id', component: NewReportComponent},
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
