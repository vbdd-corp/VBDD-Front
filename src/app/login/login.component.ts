import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {LoginService} from '../../services/login.service';
import {AlertService} from '../../services/alert.service';


@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginService,
    private alertService: AlertService) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mail: ['', Validators.required],
      password: ['', Validators.required]
    });


    this.authenticationService.logout();
    this.redirect();

  }

  private redirect() {
    if (localStorage.getItem('User') != null) {
      if (JSON.parse(localStorage.getItem('User')).isStudent()) {
        this.returnUrl = '/homeStudent';
      } else {
        this.returnUrl = '/homeStd';
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.mail.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          if (error.toString().includes('Object')) {
            this.alertService.error(error.message);
          } else {
            this.alertService.error(error);
          }
          this.loading = false;
        });
  }
}
