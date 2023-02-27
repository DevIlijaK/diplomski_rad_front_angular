import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {StoreModule} from "@ngrx/store";
import {sharedReducers} from "../shared/store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {AdminEffects} from "./store/effects";
import {ADMIN_CONFIG_TOKEN, ADMIN_LOCAL_STORAGE_KEY, ADMIN_STORAGE_KEYS} from "./admin.tokens";
import {LocalStorageService} from "../shared/services/local-storage.service";
import {INIT_ADMIN_STATE} from "./store/state";
import {MetaReducer} from "@ngrx/store/src/models";
import {storageMetaReducerFactory} from "../shared/services/storage.metareducer";
import {UsersTableComponent} from './components/users-table/users-table.component';
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {SharedModule} from "../shared/shared.module";
import {adminReducers} from "./store/reducers";
import {MatTableModule} from "@angular/material/table";
import { EditUserModalComponent } from './modals/edit-user-modal/edit-user-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RolePipe} from "./pipes/role.pipe";

const grantedActions = [];

export function getSharedConfig(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService,
): { metaReducers: MetaReducer<any>[] } {
  return {
    metaReducers: [
      storageMetaReducerFactory(saveKeys, localStorageKey, storageService, grantedActions),
    ],
  };
}

@NgModule({
  declarations: [
    UsersTableComponent,
    EditUserModalComponent,
    RolePipe
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        StoreModule.forFeature('admin', adminReducers, ADMIN_CONFIG_TOKEN),
        EffectsModule.forFeature([AdminEffects]),
        AngularMaterialModule,
        SharedModule,
        ReactiveFormsModule,
    ],
  providers: [
    {provide: ADMIN_LOCAL_STORAGE_KEY, useValue: '__admin_storage__'},
    {provide: ADMIN_STORAGE_KEYS, useValue: Object.keys(INIT_ADMIN_STATE)},
    {
      provide: ADMIN_CONFIG_TOKEN,
      deps: [ADMIN_STORAGE_KEYS, ADMIN_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getSharedConfig,
    },
    RolePipe
  ],
  exports: [
    RolePipe
  ]
})
export class AdminModule {
}
