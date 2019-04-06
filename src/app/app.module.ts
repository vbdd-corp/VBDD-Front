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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AlertService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
