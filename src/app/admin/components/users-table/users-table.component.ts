import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {combineLatestWith, merge, Subject, Subscription, takeUntil} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup} from "@angular/forms";
import {tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {getAppUsers} from "../../store/actions";
import {AppUser} from "../../constants/appUser";
import {selectAppUsers, selectTotalAppUsers} from "../../store/selectors";
import {GetAppUsersRequest} from "../../model/get-app-users-request";
import {DatatableConfigurationModel} from "../../../shared/models/datatable-configuration.model";
import {saveDatatableConfig} from "../../../shared/store/actions";
import {selectDatatableConfiguration} from "../../../shared/store/selectors";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, OnDestroy, AfterViewInit {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'department', 'managers', 'duties', 'actions'];

  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource<AppUser>([]);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: false}) sort: MatSort;
  private subscription: Subscription = new Subscription();
  public totalNumberOfAppUsers: number;
  searchForm: FormGroup;
  private datatablesConfig: DatatableConfigurationModel[];
  private tableId = 'app-user_list_table';

  // actions: ActionConfig[] = [];


  constructor(private store$: Store,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private cdr: ChangeDetectorRef) {
    this.dispatch();
  }

  ngOnInit(): void {
    this.subscribe();
    // this.store$.pipe(select(AuthSelectors.selectSearchUsers)).pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
    //   this.searchResponse = value;
    //   this.dataSource.connect().next(value.data.filter(user => user.username !== 'guest'));
    // });
    // this.initActions();
    // this.initSearchForm();
    // this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe(value => {
    //   this.paginator.pageIndex = 0;
    //   this.onPaginate(null);
    //   this.searchUsers();
// ?    });
    // this.store$.pipe(select(selectAdminDatatablesConfig)).pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
    //   this.datatablesConfig = value;
    // });
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
    this.cdr.detectChanges();
  }

  private dispatch(): void {
    this.store$.dispatch(saveDatatableConfig({
      datatableConfigurationModel: {
        tableId: this.tableId,
        pageNumber: 0,
        pageSize: 5,
        pageSort: 'username'
      }
    }));

  }

  private subscribe(): void {
    this.store$.pipe(takeUntil(this.ngUnsubscribe), select(selectAppUsers))
      .subscribe(appUsers => this.dataSource.connect().next(appUsers));
    this.store$.pipe(takeUntil(this.ngUnsubscribe), select(selectTotalAppUsers))
      .subscribe(totalNumberOfAppUsers => this.totalNumberOfAppUsers = totalNumberOfAppUsers)
    this.store$.pipe(takeUntil(this.ngUnsubscribe), select(selectDatatableConfiguration))
      .subscribe((dataTableConfiguration) => this.datatablesConfig = dataTableConfiguration);
  }

  getAppUsers() {
    console.log('uslo ovde');
    this.store$.dispatch(getAppUsers({
      getAppUsersRequest: {
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        sort: 'firstname'
      } as GetAppUsersRequest
    }));
  }

  addUser() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  editUser(user) {
    this.router.navigate(['edit/' + user.userId], {relativeTo: this.route});
  }

  // importUsers() {
  //   this.modalService.openImportUsersModal();
  // }

  private initSearchForm() {
    this.searchForm = this.formBuilder.group({
      query: ['']
    });
  }

  private initActions() {
    // this.actions.push({
    //   fabIcon: 'cloud_upload',
    //   tooltip: 'tooltip.user.import',
    //   onClick: () => {
    //     this.importUsers();
    //   }
    // } as ActionConfig);
    // this.actions.push({
    //   fabIcon: 'person_add',
    //   tooltip: 'tooltip.user.add',
    //   onClick: () => {
    //     this.addUser();
    //   }
    // } as ActionConfig);
  }

  initDatatableConfig() {
    console.log(1);
    const datatableConfig = this.datatablesConfig.find(value => value.tableId === this.tableId);
    this.paginator.pageSize = datatableConfig ? datatableConfig.pageSize : 5;
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
