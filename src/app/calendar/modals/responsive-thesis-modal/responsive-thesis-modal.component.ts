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
  createdTime = new Date().toISOString();
  startDate = new Date().toISOString();
  endDate = new Date().toISOString();
  id = 'id123';
  summary = 'summary123';
  location = 'FON';
  description = 'description123';
  event = {
    start: [2018, 5, 30, 6, 30],
    duration: { hours: 6, minutes: 30 },
    title: 'Bolder Boulder',
    description: 'Annual 10-kilometer run in Boulder, Colorado',
    location: 'Folsom Field, University of Colorado (finish line)',
    url: 'http://www.bolderboulder.com/',
    geo: { lat: 40.0095, lon: 105.2669 },
    categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
    attendees: [
      { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
      { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton', role: 'OPT-PARTICIPANT' }
    ]
  }


  constructor(@Inject(MAT_DIALOG_DATA) public data: { thesis: ThesisModel }) {}

  ngOnInit(): void {
  }
  generateICalendarFIle(){
    // const calendarData = [
    //   'data:text/calendar;charset=utf8,',
    //   'BEGIN:VEVENT',
    //   'DESCRIPTION:' + this.data.thesis.thesisTitle,
    //   'DTSTART:' + this.data.thesis.thesisDateOfDefense.toISOString(),
    //   'DTEND:' + new Date(this.data.thesis.thesisDateOfDefense.getTime() + (60 * 60 * 1000)).toISOString(),
    //   'LOCATION:' + this.location,
    //   'SUMMARY:' + this.data.thesis.thesisType,
    //   'TRANSP:TRANSPARENT',
    //   'END:VEVENT',
    //   'END:VCALENDAR',
    //   'UID:' + this.id,
    //   'DTSTAMP:' + this.createdTime,
    //   'PRODID:website-1.0'
    // ].join('\n');
    //
    // window.open(calendarData);
    console.log('MESEC', this.data.thesis.thesisDateOfDefense.getMonth());
    console.log('dan ', this.data.thesis.thesisDateOfDefense.getDay());
    console.log('dan 2', this.data.thesis.thesisDateOfDefense.getTime());
    console.log('dan 3', this.data.thesis.thesisDateOfDefense.getDate());

    ics.createEvent({
      title: 'Odbrana diplomskog rada - ' + this.data.thesis.student.full_name,
      description: this.data.thesis.thesisTitle,
      busyStatus: 'FREE',
      start: [
        this.data.thesis.thesisDateOfDefense.getFullYear(),
        this.data.thesis.thesisDateOfDefense.getMonth() + 1,
        this.data.thesis.thesisDateOfDefense.getDate(),
        this.data.thesis.thesisDateOfDefense.getHours(),
        this.data.thesis.thesisDateOfDefense.getMinutes()],
      duration: { minutes: 50 },
      attendees: [
        { name: 'Adam Gibbons', email: 'adam@example.com', role: 'REQ-PARTICIPANT' },
        { name: 'Brittany Seaton', email: 'brittany@example2.org', role: 'REQ-PARTICIPANT' },
        { name: 'Brittany Seaton', email: 'brittany@example2.org', role: 'REQ-PARTICIPANT' },
        { name: 'Brittany Seaton', email: 'brittany@example2.org', role: 'REQ-PARTICIPANT' },
      ]
    }, (error, value) => {
      if (error) {
        console.log(error)
      }

      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      saveAs(blob, 'event.ics');
    })
  }
}
