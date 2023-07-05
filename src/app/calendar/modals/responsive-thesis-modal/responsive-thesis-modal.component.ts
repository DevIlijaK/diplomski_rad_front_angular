import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ThesisModel} from "../../../shared/models/thesis.model";
import * as ics from 'ics';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-responsive-thesis-modal',
  templateUrl: './responsive-thesis-modal.component.html',
  styleUrls: ['./responsive-thesis-modal.component.scss']
})
export class ResponsiveThesisModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { thesis: ThesisModel }) {}

  ngOnInit(): void {
  }
  generateICalendarFIle(){
    console.log('MESEC', this.data.thesis.thesisDateOfDefense.getMonth());
    console.log('dan ', this.data.thesis.thesisDateOfDefense.getDay());
    console.log('dan 2', this.data.thesis.thesisDateOfDefense.getTime());
    console.log('dan 3', this.data.thesis.thesisDateOfDefense.getDate());
    let alarms = []
    alarms.push({
      action: 'display',
      trigger: {hours:2,minutes:0,before:true},
    })

    ics.createEvents([{
          title: 'Odbrana diplomskog rada - ' + this.data.thesis.student.full_name,
        description: this.data.thesis.thesisTitle,
        // busyStatus: 'FREE',
        start: [
          this.data.thesis.thesisDateOfDefense.getFullYear(),
          this.data.thesis.thesisDateOfDefense.getMonth() + 1,
          this.data.thesis.thesisDateOfDefense.getDate(),
          this.data.thesis.thesisDateOfDefense.getHours(),
          this.data.thesis.thesisDateOfDefense.getMinutes()],
        duration: { minutes: 50 },
        alarms: alarms,
      }
          ]
    , (error, value) => {
      if (error) {
        console.log(error)
      }

      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      saveAs(blob, 'event.ics');
    })
  }
}
