import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import {selectOpenModal} from "../../store/selectors";
import * as SharedActions from '../../store/actions';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent implements OnInit {

  openModal: boolean = true;

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.store$.select(selectOpenModal).subscribe(value => this.openModal = value);
  }
  closeModal(): void {
    this.store$.dispatch(SharedActions.closeModal());
  }

}
