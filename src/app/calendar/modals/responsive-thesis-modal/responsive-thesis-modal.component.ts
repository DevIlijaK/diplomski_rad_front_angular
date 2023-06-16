import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ThesisModel} from "../../../shared/models/thesis.model";

@Component({
  selector: 'app-responsive-thesis-modal',
  templateUrl: './responsive-thesis-modal.component.html',
  styleUrls: ['./responsive-thesis-modal.component.scss']
})
export class ResponsiveThesisModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { thesis: ThesisModel }) {}

  ngOnInit(): void {
  }

}
