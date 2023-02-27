import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AppUser} from "../../constants/appUser";
import {closeModal} from "../../../shared/store/actions";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppUserRole} from "../../constants/appUserRole";

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

  constructor(private store$: Store,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Data) {
  }

  ngOnInit(): void {
    this.initForm();
    console.log(this.data);
    console.log(this.data.appUser.roles);
    console.log(this.data.appUser.roles[1] === this.data.appUserRoles[0]);
    console.log(this.data.appUser.roles[1] == this.data.appUserRoles[0]);
    console.log(this.data.appUserRoles[0]);
    console.log(this.data.appUser.roles[1]);
    console.log(
      this.data.appUserRoles.filter(
        (appUserRole) =>
          this.data.appUser.roles.some(
            (role) => JSON.stringify(appUserRole) === JSON.stringify(role)
          )
      )
    );
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstname: [(this.data.appUser.firstname || '')],
      lastname: [(this.data.appUser.lastname || '')],
      username: [(this.data.appUser.username || '')],
      email: [(this.data.appUser.email || '')],
      /**
       * @todo
       */
      roles: [this.data.appUserRoles.filter(
        (appUserRole) =>
          this.data.appUser.roles.some(
            (role) => JSON.stringify(appUserRole) === JSON.stringify(role)
          )
      ) || []],
    })
  }

  closeDialog(): void {
    this.store$.dispatch(closeModal());
  }

  callbackFunc(): void {
    this.data.callbackFunc({
      username: this.data.appUser.username,
      firstname: this.form.controls.firstname.value,
      lastname: this.form.controls.lastname.value,
      email: this.form.controls.email.value,
      roles: this.form.controls.roles.value,
    });
    this.closeDialog();
  }

}
