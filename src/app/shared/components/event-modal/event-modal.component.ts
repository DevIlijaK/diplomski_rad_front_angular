import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import {selectModalData, selectOpenModal} from "../../store/selectors";
import * as SharedActions from '../../store/actions';

export interface ModalData{
  day: string;
  dayName: string;
}
@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent implements OnInit {

  openModal: boolean = true;
  modalData: ModalData = {
    day: '',
    dayName: ''
  };

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.store$.select(selectOpenModal).subscribe(value => this.openModal = value);
    this.store$.select(selectModalData).subscribe(value => this.modalData = value);

  }
  closeModal(): void {
    this.store$.dispatch(SharedActions.closeModal());
  }

}
