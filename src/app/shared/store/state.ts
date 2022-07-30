import {MatDialogRef} from "@angular/material/dialog";


export interface SharedState {
  modals: MatDialogRef<any>[];
  activeRoute: string;
}

export const INIT_SHARED_STATE: SharedState = {
  modals: [],
  activeRoute: '',
 };
