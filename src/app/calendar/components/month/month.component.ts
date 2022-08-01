import {Component, Input, OnInit} from '@angular/core';
import {Dayjs} from "dayjs";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
  @Input() currentMonth: Dayjs[][];

  dayOfTheWeekArray: string[] = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'];

  constructor() { }

  ngOnInit(): void {
  }

}
