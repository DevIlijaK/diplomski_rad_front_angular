import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AppUser} from "../../constants/appUser";
import {closeModal} from "../../../shared/store/actions";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppUserRole} from "../../constants/appUserRole";
import {Observable} from "rxjs";

interface Data {
  appUser: AppUser
  callbackFunc: (appUser: AppUser) => void
  appUserRoles: AppUserRole[]
}

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
  form: FormGroup;
  data$: Observable<Data>;

  constructor(private store$: Store,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Data) {
    this.data$ = new Observable<Data>(observer => {
      observer.next(this.data);
    });
  }

  ngOnInit(): void {
    this.data$.subscribe(data => {
      console.log("Uslo ovde", data);
      this.initForm()
    });
    this.form.valueChanges.subscribe(value => console.log(value));
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstname: [(this.data.appUser && this.data.appUser.firstname || ''), [Validators.required]],
      password: ['', [this.data.appUser ? Validators.nullValidator : Validators.required]],
      lastname: [(this.data.appUser && this.data.appUser.lastname || ''), [Validators.required]],
      username: [(this.data.appUser && this.data.appUser.username || ''), [Validators.required]],
      email: [(this.data.appUser && this.data.appUser.email || ''), [Validators.required, Validators.email]],
      roles: [this.data.appUser && this.data.appUserRoles.filter(
        (appUserRole) =>
          this.data.appUser.roles.some(
            (role) => JSON.stringify(appUserRole) === JSON.stringify(role)
          )
      ) || [], [Validators.required]],
    })
    if (this.data.appUser) {
      let username = this.form.get('username');
      username.disable();
      username.clearValidators();
      username.updateValueAndValidity();
    }
  }

  closeDialog(): void {
    this.store$.dispatch(closeModal());
  }

  callbackFunc(): void {
    console.log(1);
    let appUser = {
      username: this.data.appUser ? this.data.appUser.username : this.form.controls.username.value,
      firstname: this.form.controls.firstname.value,
      lastname: this.form.controls.lastname.value,
      email: this.form.controls.email.value,
      roles: this.form.controls.roles.value,
    } as AppUser;
    appUser['password'] = this.data.appUser ? this.data.appUser.password : this.form.controls.password.value;
    console.log("posle", appUser);
    if (this.data.appUser) {
      console.log("Uslo u if?", this.data.appUser);
      delete appUser.password;
    }
    console.log("posle", appUser);
    this.data.callbackFunc(appUser);
    this.closeDialog();
  }


}
