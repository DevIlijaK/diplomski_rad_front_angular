import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthState} from "../../store/state";
import {Store} from "@ngrx/store";
import {AUTH_CONFIG_TOKEN, AuthModuleConfig} from "../../auth.tokens";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  language$: Observable<string>;
  companyLogo: string;

  constructor(private formBuilder: FormBuilder,
              private store$: Store<AuthState>,
              @Inject(AUTH_CONFIG_TOKEN)
              private config: AuthModuleConfig) {
  }

  ngOnInit(): void {
    this.initForm();
    this.companyLogo = this.config.loginCompanyLogoName || 'logo.png';
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login(): void {
    // this.store$.dispatch(AuthActions.login(this.form.value));
  }

}
