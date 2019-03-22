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
import {AuthentificationService} from '../services/authentification.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AlertService,
    AuthentificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
