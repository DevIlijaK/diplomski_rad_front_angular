import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {login} from "../../store/actions";
import {LoginRequest} from "../../model/login-request";


@Component({
  selector: 'app-login-custom',
  templateUrl: './login-custom.component.html',
  styleUrls: ['./login-custom.component.scss']
})
export class LoginCustomComponent implements OnInit {

  form: FormGroup;
  hide = true;

  constructor(private store$: Store,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const loginRequest = {
      username: this.form.value.username,
      password: this.form.value.password
    } as LoginRequest;
    this.store$.dispatch(login({loginRequest}));
  }
}
