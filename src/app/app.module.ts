import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AlertService, LoginService} from '../services';
import {HttpClientModule} from '@angular/common/http';
import {AlertComponent} from '../directives';
import {HomeBriComponent} from './bris/home';
import {HomeStdComponent} from './students/home';
import {ReportComponent} from './students/report/report.component';
import {StudentInformationsComponent} from './students/student-informations/student-informations.component';
import {RendezvousComponent} from './students/rendezvous/rendezvous.component';
import {PriseRdvComponent} from './students/prise-rdv';
import {EditComponent} from './reports/edit/edit.component';
import {ModalComponent} from './students/report/modal/modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NewReportComponent} from './reports/new/new.component';
import {ModulesManagerComponent} from './modules/modules-manager/modules-manager.component';
import {ReportEditorComponent} from './modules/report-editor/report-editor.component';
import {ReportCreatorService} from '../services/report-creator.service';
import {CniComponent} from './modules/list-modules/cni/cni.component';
import {PassportComponent} from './modules/list-modules/passport/passport.component';
import {InfosGeneralesComponent} from './modules/list-modules/infos-generales/infos-generales.component';
import {ContratEtudiantAsieComponent} from './modules/list-modules/contrat-etudiant-asie/contrat-etudiant-asie.component';
import {LettreMotivationComponent} from './modules/list-modules/lettre-motivation/lettre-motivation.component';
import {EuropassComponent} from './modules/list-modules/europass-component/europass.component';
import {ReleveNoteComponent} from './modules/list-modules/releve-note-component/releve-note.component';
import {BudgetPrevisionnelComponent} from './modules/list-modules/budget-previsionnel-component/budget-previsionnel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    AlertComponent,
    HomeBriComponent,
    HomeStdComponent,
    ReportComponent,
    StudentInformationsComponent,
    RendezvousComponent,
    PriseRdvComponent,
    EditComponent,
    ModalComponent,
    NewReportComponent,
    ModulesManagerComponent,
    ReportEditorComponent,
    CniComponent,
    PassportComponent,
    InfosGeneralesComponent,
    ContratEtudiantAsieComponent,
    LettreMotivationComponent,
    EuropassComponent,
    ReleveNoteComponent,
    BudgetPrevisionnelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    ReportComponent,
    ReportEditorComponent,
    EuropassComponent
  ],
  providers: [
    AlertService,
    LoginService,
    ReportCreatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
