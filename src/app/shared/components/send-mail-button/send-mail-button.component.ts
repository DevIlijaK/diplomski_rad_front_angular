import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import * as SharedActions from '../../store/actions';

@Component({
  selector: 'app-send-mail-button',
  templateUrl: './send-mail-button.component.html',
  styleUrls: ['./send-mail-button.component.scss']
})
export class SendMailButtonComponent implements OnInit {

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
  }
  openModal() {
    this.store$.dispatch(SharedActions.openModal());
  }
}
