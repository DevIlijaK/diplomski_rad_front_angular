import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-primeri-angular-material',
  templateUrl: './primeri-angular-material.component.html',
  styleUrls: ['./primeri-angular-material.component.scss']
})
export class PrimeriAngularMaterialComponent implements OnInit {

  opened = false;
  options = ['123', '456', '789'];
  objectOptions = [
    {name: 'Angular'},
    {name: 'Angular Material'},
    {name: 'React'},
    {name: 'Vue'}
  ];
  myControl = new FormControl;
  filteredOptions: Observable<any[]>;
  minDate = new Date();
  maxDate = new Date(2019, 3, 10);

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog,
              ) {
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )

  }
  displayFn(subject) {
    return subject ? subject.name : undefined;
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase()
    return this.objectOptions.filter(option =>
    option.name.toLowerCase().includes(filterValue))
  }
  dateFilter = date => {
    if(date) {
    const day = date.getDay();
    return day !== 0 && day !==6
    }
    return null;
  }
  openSnackBar(message, action) {
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});
  }

}
