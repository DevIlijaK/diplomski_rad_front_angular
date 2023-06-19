import {Component, OnInit} from '@angular/core';
import {EventModalComponent} from "../../../shared/components/event-modal/event-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ModalService} from "../../services/modal-service";
import * as dayjs from "dayjs";
import {ThesisModel} from "../../../shared/models/thesis.model";
import {Store} from "@ngrx/store";
import {selectThesis} from "../../../shared/store/selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-responsive-day-card',
  templateUrl: './responsive-day-card.component.html',
  styleUrls: ['./responsive-day-card.component.scss']
})
export class ResponsiveDayCardComponent implements OnInit {

  thesisData: Observable<ThesisModel[]>;

  constructor(private modalService: ModalService,
              private store$: Store) {
  }

  openModal(thesis: ThesisModel) {
    this.modalService.openThesisModal(thesis);
  }

  ngOnInit(): void {
    this.thesisData = this.store$.select(selectThesis);
    this.thesisData.subscribe(data => console.log(typeof data[0].thesisDateOfDefense))

  }

}
