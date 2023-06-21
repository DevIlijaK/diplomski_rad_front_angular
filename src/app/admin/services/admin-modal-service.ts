import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {openModal} from "../../shared/store/actions";
import {EditUserModalComponent} from "../modals/edit-user-modal/edit-user-modal.component";
import {AppUser} from "../constants/appUser";
import {AppUserRole} from "../constants/appUserRole";

@Injectable({
  providedIn: 'root'
})
export class AdminModalService{
  constructor(private store$: Store) {
  }
  openAppUserModal(appUser: AppUser, callbackFunc: (appUser: AppUser) => void, appUserRoles: AppUserRole[]){
    return this.store$.dispatch(openModal({
      component: EditUserModalComponent,
      config: {
        data: {
          appUser,
          callbackFunc,
          appUserRoles
        }
      }
    }))
  }
}
