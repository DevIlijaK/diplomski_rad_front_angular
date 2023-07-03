import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EventModalComponent} from "../../../shared/components/event-modal/event-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ModalService} from "../../services/modal-service";
import * as dayjs from "dayjs";
import {ThesisModel} from "../../../shared/models/thesis.model";
import {Store} from "@ngrx/store";
import {selectThesis} from "../../../shared/store/selectors";
import {Observable, of, Subject, take, takeUntil} from "rxjs";
import {map} from "rxjs/operators";
import {selectLoggedInUser} from "../../../auth/store/selectors";
import {LoggedInUser} from "../../../auth/model/loggedInUser";

@Component({
  selector: 'app-responsive-day-card',
  templateUrl: './responsive-day-card.component.html',
  styleUrls: ['./responsive-day-card.component.scss']
})
export class ResponsiveDayCardComponent implements OnInit, OnDestroy {

  thesisData: Observable<ThesisModel[]>;
  ngUnsubscribe: Subject<void> = new Subject<void>();
  @Input() thesisList: ThesisModel[] = [];
  logedInUser: LoggedInUser;

  constructor(private modalService: ModalService,
              private store$: Store) {
  }

  openModal(thesis: ThesisModel) {
    this.modalService.openThesisModal(thesis);
  }

  ngOnInit(): void {
    this.store$.select(selectLoggedInUser).subscribe(user => this.logedInUser = user);
    if (this.thesisList.length === 0) {
      this.thesisData = this.store$.select(selectThesis);
    } else {
      this.thesisData = of(this.thesisList);
    }

    this.thesisData.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.thesisList = data;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
