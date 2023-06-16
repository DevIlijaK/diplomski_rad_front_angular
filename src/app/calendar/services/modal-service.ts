import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ResponsiveThesisModalComponent} from "../modals/responsive-thesis-modal/responsive-thesis-modal.component";
import {ThesisModel} from "../../shared/models/thesis.model";

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openThesisModal(thesis: ThesisModel): void {
    this.dialog.open(ResponsiveThesisModalComponent, {
      data: { thesis },
      width: '400px'
    });
  }
}
