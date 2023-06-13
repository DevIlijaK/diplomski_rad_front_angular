import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {merge, Subject, Subscription, takeUntil, tap} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {createAppUser, getAllAppUserRoles, getAppUsers, updateAppUser} from "../../store/actions";
import {AppUser} from "../../constants/appUser";
import {selectAppUserRoles, selectAppUsers, selectTotalAppUsers} from "../../store/selectors";
import {GetAppUsersRequest} from "../../model/get-app-users-request";
import {DatatableConfigurationModel} from "../../../shared/models/datatable-configuration.model";
import {saveDatatableConfig} from "../../../shared/store/actions";
import {selectDatatableConfiguration} from "../../../shared/store/selectors";
import {MatSort} from "@angular/material/sort";
import {AdminModalService} from "../../services/admin-modal-service";
import {AppUserRole} from "../../constants/appUserRole";
import {ActionConfig} from "../../../shared/components/panel/panel.component";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  displayedColumns = ['username', 'firstName', 'lastName', 'email', 'roles', 'actions'];

  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource<AppUser>([]);
  appUserHeaderActions: ActionConfig[];
  appUserRoles: AppUserRole[];
  private subscription: Subscription = new Subscription();
  public totalNumberOfAppUsers: number;
  searchForm: FormGroup;
  private datatablesConfig: DatatableConfigurationModel[];
  private tableId = 'app-user_list_table';

  // actions: ActionConfig[] = [];


  constructor(private store$: Store,
              private router: Router,
              private route: ActivatedRoute,
              private adminModalService: AdminModalService,
              private formBuilder: FormBuilder,
              private cdr: ChangeDetectorRef) {
    this.dispatch();
  }

  ngOnInit(): void {
    this.appUserHeaderActions = this.getAppUserHeaderActions()
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.initDatatableConfig();
    }
    this.getAppUsers();
    // if(this.sort){
    //   this.dataSource.sort = this.sort;
    //   console.log(this.dataSource.sort);
    // }
    const sort$ = this.sort.sortChange.pipe(tap((sort) => {
      console.log(sort)
      return this.paginator.pageIndex = 0
    }));
    this.subscription.add(merge(sort$, this.paginator.page).pipe(
      tap(() => this.getAppUsers())
    ).subscribe());
    this.cdr.detectChanges();
  }

  private dispatch(): void {
    this.store$.dispatch(saveDatatableConfig({
      datatableConfigurationModel: {
        tableId: this.tableId,
        pageNumber: 0,
        pageSize: 10,
        pageSort: 'username'
      }
    }));
    this.store$.dispatch(getAllAppUserRoles());
  }

  private subscribe(): void {
    this.store$.pipe(takeUntil(this.ngUnsubscribe), select(selectAppUsers))
      .subscribe(appUsers => this.dataSource.connect().next(appUsers));
    this.store$.pipe(takeUntil(this.ngUnsubscribe), select(selectTotalAppUsers))
      .subscribe(totalNumberOfAppUsers => this.totalNumberOfAppUsers = totalNumberOfAppUsers);
    this.store$.pipe(takeUntil(this.ngUnsubscribe), select(selectDatatableConfiguration))
      .subscribe((dataTableConfiguration) => this.datatablesConfig = dataTableConfiguration);
    this.store$.pipe(takeUntil(this.ngUnsubscribe), select(selectAppUserRoles))
      .subscribe((appUserRoles) => this.appUserRoles = appUserRoles);
  }

  getAppUsers() {
    this.store$.dispatch(getAppUsers({
      getAppUsersRequest: {
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        sort: 'username'
      } as GetAppUsersRequest
    }));
  }

  addUser() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  editUser(appUser: AppUser) {
    this.adminModalService.openAppUserModal(
      appUser, (appUser) => this.store$.dispatch(updateAppUser({appUser})),
      this.appUserRoles
    )
  }
  getAppUserHeaderActions(): ActionConfig[] {
    const defaultDocumentHeaderActions = [];
    defaultDocumentHeaderActions.push({
      fabIcon: 'add',
      tooltip: 'Kreiraj novog korisnika',
      onClick: () => this.adminModalService.openAppUserModal(
        null,
        (appUser) => this.store$.dispatch(createAppUser({appUser})),
        this.appUserRoles
      )
    });
    return defaultDocumentHeaderActions;

  }
  private initSearchForm() {
    this.searchForm = this.formBuilder.group({
      query: ['']
    });
  }

  initDatatableConfig() {
    const datatableConfig = this.datatablesConfig.find(value => value.tableId === this.tableId);
    this.paginator.pageSize = datatableConfig ? datatableConfig.pageSize : 10;
    this.paginator.pageIndex = datatableConfig ? datatableConfig.pageNumber : 0;
    // this.sort = datatableConfig ? datatableConfig.pageNumber : 0;
  }

  onPaginate(): void {
    const datatableConfigurationModel = {
      tableId: this.tableId,
      pageNumber: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      pageSort: 'firstname'
    } as DatatableConfigurationModel;
    this.store$.dispatch(saveDatatableConfig({datatableConfigurationModel}));
  }
}