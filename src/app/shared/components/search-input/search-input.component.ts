import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() searchFormControl: FormControl;
  @Output() searchKeyUp: EventEmitter<any> = new EventEmitter<any>();
  @Input() appearance?: any;

  constructor() { }

  ngOnInit(): void {
  }

  clearSearch() {
    if (this.searchFormControl) { this.searchFormControl.patchValue(''); }
  }

  searchEvent() {
    this.searchKeyUp.emit();
  }

}
