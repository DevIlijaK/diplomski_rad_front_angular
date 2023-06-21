import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ResponsiveThesisModalComponent} from "../modals/responsive-thesis-modal/responsive-thesis-modal.component";
import {ThesisModel} from "../../shared/models/thesis.model";
import {SmallScreenCalendarComponent} from "../components/small-screen-calendar/small-screen-calendar.component";
import {ThesisListModalComponent} from "../modals/thesis-list-modal/thesis-list-modal.component";

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openThesisModal(thesis: ThesisModel): void {
    this.dialog.open(ResponsiveThesisModalComponent, {
      data: { thesis },
      width: '400px'
    });
  }
  openThesisListModal(thesisList: ThesisModel[]): void {
    this.dialog.open(ThesisListModalComponent, {
      data: { thesisList },
      width: '40%'
    });
  }
}
