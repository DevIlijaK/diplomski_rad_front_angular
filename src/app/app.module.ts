import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {META_REDUCERS, StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {NgxSpinnerModule} from "ngx-spinner";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {LocalStorageService} from "./shared/services/local-storage.service";
import {storageMetaReducerFactory} from "./shared/services/storage.metareducer";
import {ROOT_LOCAL_STORAGE_KEY, ROOT_STORAGE_KEYS} from "./app.tokens";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MAT_MOMENT_DATE_FORMATS} from "@angular/material-moment-adapter";
import {AuthInterceptor} from "./shared/interceptors/interceptors";
import {reducers} from "./root-store/reducers";
import {AuthModule} from "./auth/auth.module";
import {CalendarModule} from "./calendar/calendar.module";
import {SharedModule} from "./shared/shared.module";
import {environment} from "../environments/environment";
import { ProbaComponent } from './proba/proba.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { TreeComponent } from './tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Proba123Component } from './proba123/proba123.component';


@NgModule({
  declarations: [
    AppComponent,
    ProbaComponent,
    NavigationComponent,
    DashboardComponent,
    TreeComponent,
    DragDropComponent,
    TableComponent,
    Proba123Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 20, // Retains last 10 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
    NgxSpinnerModule,
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    CalendarModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatTreeModule,
    DragDropModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    {provide: ROOT_STORAGE_KEYS, useValue: ['app']},
    {provide: ROOT_LOCAL_STORAGE_KEY, useValue: '__app_storage__'},
    {
      provide: META_REDUCERS,
      deps: [ROOT_STORAGE_KEYS, ROOT_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: storageMetaReducerFactory,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE]
    // },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS
    },],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
