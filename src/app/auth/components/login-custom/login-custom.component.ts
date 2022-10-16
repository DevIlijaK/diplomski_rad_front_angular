import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-login-custom',
  templateUrl: './login-custom.component.html',
  styleUrls: ['./login-custom.component.scss']
})
export class LoginCustomComponent implements OnInit {

  myControl = new FormControl;
  filteredOptions: Observable<any[]>;
  objectOptions = [
    {name: 'Angular'},
    {name: 'Angular Material'},
    {name: 'React'},
    {name: 'Vue'}
  ];
  hide = true;
  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
  }
  private _filter(value: string): any[] {
    console.log(value)
    const filterValue = value.toLowerCase()
    return this.objectOptions.filter(option =>
      option.name.toLowerCase().includes(filterValue))
  }

}
