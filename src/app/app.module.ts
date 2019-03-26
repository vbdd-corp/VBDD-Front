import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AlertService} from '../services/alert.service';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from '../services/login.service';
import {AlertComponent} from '../directives';
import {HomeBriComponent} from './bris/home/home.component';
import {HomeStdComponent} from './students/home';
import {ReportComponent} from './students/report/report.component';
import {StudentInformationsComponent} from './students/student-informations/student-informations.component';
import {RendezvousComponent} from './students/rendezvous/rendezvous.component';

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
    RendezvousComponent
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
