import {createAction, props, union} from '@ngrx/store';

import {MatDialogRef} from '@angular/material/dialog';
import {ESharedAction} from "../constants/constants";


export const navigate = createAction(ESharedAction.NAVIGATE, props<{ url: string[] }>());

export const successMessages = createAction(ESharedAction.SUCCESS_MESSAGES, props<{ messagesKey: string, extraMessage?: string }>());

export const errorMessages = createAction(ESharedAction.ERROR_MESSAGES, props<{ messagesKey: string, extraMessage?: string }>());


export const openModal = createAction(ESharedAction.OPEN_DIALOG, props<{ component: any, config?: any }>());

export const openModalSuccess = createAction(ESharedAction.OPEN_DIALOG_SUCCESS, props<{ dialogRef: MatDialogRef<any> }>());

export const closeModal = createAction(ESharedAction.CLOSE_DIALOG);

export const closeModalSuccess = createAction(ESharedAction.CLOSE_DIALOG_SUCCESS);


export const openSpinner = createAction(ESharedAction.OPEN_SPINNER);

export const closeSpinner = createAction(ESharedAction.CLOSE_SPINNER);

export const setActiveRouteSuccess = createAction(ESharedAction.SET_ACTIVE_ROUTE_SUCCESS, props<{ route: string }>());

const all = union({
  navigate,
  successMessages,
  errorMessages,
  openModal,
  openModalSuccess,
  closeModal,
  closeModalSuccess,
  openSpinner,
  closeSpinner,
  setActiveRouteSuccess,
});

export type SharedActions = typeof all;
