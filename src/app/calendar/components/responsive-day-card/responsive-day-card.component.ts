import { Component, OnInit } from '@angular/core';
import {EventModalComponent} from "../../../shared/components/event-modal/event-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ModalService} from "../../services/modal-service";
import * as dayjs from "dayjs";
import {ThesisModel} from "../../../shared/models/thesis.model";

@Component({
  selector: 'app-responsive-day-card',
  templateUrl: './responsive-day-card.component.html',
  styleUrls: ['./responsive-day-card.component.scss']
})
export class ResponsiveDayCardComponent implements OnInit {

  hours = [
    { time: '00:00', event: 'Event 1' },
    { time: '01:00', event: 'Event 2' },
    { time: '01:00', event: 'Event 2' },
    { time: '01:00', event: 'Event 2' },
    { time: '01:00', event: 'Event 2' },
    { time: '01:00', event: 'Event 2' },
    { time: '01:00', event: 'Event 2' },
    { time: '01:00', event: 'Event 2' },
    { time: '01:00', event: 'Event 2' },
    // ... add more events for each hour of the day
    { time: '23:00', event: 'Event 24' }
  ];
  thesisData: ThesisModel = {
    thesisId: 1,
    thesisType: "asd",
    thesisTitle: "asd",
    thesisRegistrationDate: dayjs("2012-04-23T18:25:43.511Z"),
    thesisDateOfSubmission: dayjs("2012-04-23T18:25:43.511Z"),
    thesisDateOfDefense: dayjs("2012-04-23T18:25:43.511Z"),
    thesisGrade: 3,
    thesisTermOfDefense: dayjs(), // Replace this with the desired Dayjs instance for the term of defense
    student: {
      studentId: "123",
      full_name: "ilija koske",
      indexNumber: "1"
    }
  } ;


  constructor(private modalService: ModalService) {}

  openModal(hour: any) {
    this.modalService.openThesisModal(this.thesisData);
  }

  ngOnInit(): void {
  }

}
