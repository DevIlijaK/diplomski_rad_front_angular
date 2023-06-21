import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataModel} from "../../models/data-model";
import {Dayjs} from "dayjs";
import {ThesisModel} from "../../../shared/models/thesis.model";
import * as dayjs from "dayjs";
import {ModalService} from "../../services/modal-service";

@Component({
  selector: 'app-big-calendar-card',
  templateUrl: './big-calendar-card.component.html',
  styleUrls: ['./big-calendar-card.component.scss']
})
export class BigCalendarCardComponent implements OnInit, OnChanges {
  @Input() date: Dayjs;
  @Input() thesis: ThesisModel[];
  dataModel: DataModel;
  thesisList: ThesisModel[];

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  processThesisData(): ThesisModel[] {
    let matchCount = 0;
    let thesisList: ThesisModel[] = []
    this.thesis.forEach(thesis => {
      const thesisDate = dayjs(thesis.thesisDateOfDefense);
      if (this.date.isSame(thesisDate, 'day')) {
        matchCount++;
        thesisList.push(thesis);
      }
    })
    this.dataModel = {date: this.date, matches: matchCount};
    return thesisList;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes != null) {
      this.thesisList = this.processThesisData();
    }
  }

  openModal() {
    this.modalService.openThesisListModal(this.thesisList);
  }

}
