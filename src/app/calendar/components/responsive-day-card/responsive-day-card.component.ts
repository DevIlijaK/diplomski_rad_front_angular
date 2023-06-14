import { Component, OnInit } from '@angular/core';
import {EventModalComponent} from "../../../shared/components/event-modal/event-modal.component";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private dialog: MatDialog) {}

  openModal(hour: any) {
    this.dialog.open(EventModalComponent, {
      data: { time: hour.time, event: hour.event }
    });
  }

  ngOnInit(): void {
  }

}
