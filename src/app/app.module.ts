import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertService, LoginService} from '../services';
import {HttpClientModule} from '@angular/common/http';
import {AlertComponent} from '../directives';
import {HomeStdComponent} from './students/home';
import {ReportComponent} from './students/report/report.component';
import {StudentInformationsComponent} from './students/student-informations/student-informations.component';
import {RendezvousComponent} from './students/rendezvous/rendezvous.component';
import {PriseRdvComponent} from './students/prise-rdv';
import {EditComponent} from './reports/edit/edit.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NewReportComponent} from './reports/new/new.component';
import {ModulesManagerComponent} from './modules/modules-manager/modules-manager.component';
import {ReportEditorComponent} from './modules/report-editor/report-editor.component';
import {ModuleService} from '../services/module.service';
import {CniComponent} from './modules/list-modules/cni/cni.component';
import {PassportComponent} from './modules/list-modules/passport/passport.component';
import {InfosGeneralesComponent} from './modules/list-modules/infos-generales/infos-generales.component';
import {LettreMotivationComponent} from './modules/list-modules/lettre-motivation/lettre-motivation.component';
import {EuropassComponent} from './modules/list-modules/europass-component/europass.component';
import {ReleveNoteComponent} from './modules/list-modules/releve-note-component/releve-note.component';
import {BudgetPrevisionnelComponent} from './modules/list-modules/budget-previsionnel-component/budget-previsionnel.component';
import {FileUploadModule} from 'ng2-file-upload';
import {EspaceBriComponent} from './bri/espace-bri/espace-bri.component';
import {ReportCheckerComponent} from './bri/report-checker/report-checker.component';
import {ContratEtudeComponent} from './modules/list-modules/contrat-etude/contrat-etude.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {VoeuxUniversitesComponent} from './modules/list-modules/voeux-universites/voeux-universites.component';
import {AvailabilityBriComponent} from './bri/availability-bri/availability-bri.component';
import {CalendarPlageComponent} from './plages/calendar-plage/calendar-plage.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {PlageEditComponent} from './plages/plage-edit/plage-edit.component';
import {PlageAddComponent} from './plages/plage-add/plage-add.component';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {BsDatepickerModule, DatepickerModule} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {frLocale} from 'ngx-bootstrap/locale';
import {ReportsFiltererComponent} from './bri/reports-filterer/reports-filterer.component';
import { CalendarCreneauComponent } from './creneaux/calendar-creneau/calendar-creneau.component';
import { PlanningBriComponent } from './bri/planning-bri/planning-bri.component';

registerLocaleData(localeFr);

defineLocale('fr', frLocale);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    AlertComponent,
    HomeStdComponent,
    ReportComponent,
    StudentInformationsComponent,
    RendezvousComponent,
    PriseRdvComponent,
    EditComponent,
    NewReportComponent,
    ModulesManagerComponent,
    ReportEditorComponent,
    CniComponent,
    PassportComponent,
    InfosGeneralesComponent,
    ContratEtudeComponent,
    LettreMotivationComponent,
    EuropassComponent,
    ReleveNoteComponent,
    BudgetPrevisionnelComponent,
    EspaceBriComponent,
    ReportCheckerComponent,
    ContratEtudeComponent,
    AvailabilityBriComponent,
    CalendarPlageComponent,
    ContratEtudeComponent,
    VoeuxUniversitesComponent,
    PlageEditComponent,
    PlageAddComponent,
    ReportsFiltererComponent,
    CalendarCreneauComponent,
    PlanningBriComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    FileUploadModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule,
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  exports: [
    ReportComponent,
    ReportEditorComponent,
    EuropassComponent
  ],
  providers: [
    AlertService,
    LoginService,
    ModuleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
