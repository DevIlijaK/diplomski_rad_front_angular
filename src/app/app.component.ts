import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {openSpinner} from "./shared/store/actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'diplomski_front';
  constructor(private store$: Store) {
  }
}
