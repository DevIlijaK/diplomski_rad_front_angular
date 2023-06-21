import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ThesisModel} from "../../../shared/models/thesis.model";

@Component({
  selector: 'app-thesis-list-modal',
  templateUrl: './thesis-list-modal.component.html',
  styleUrls: ['./thesis-list-modal.component.scss']
})
export class ThesisListModalComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: {thesisList: ThesisModel[]}) { }

  ngOnInit(): void {
  }

  openModal() {
  }
}
