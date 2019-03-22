import {Component, NgModule} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule],
  providers: [ReactiveFormsModule]

})

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router: Router) {

  }
}
