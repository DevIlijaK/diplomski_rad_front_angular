import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatFormFieldControl} from "@angular/material/form-field";
import {Subject} from "rxjs";

class MyTel {
  constructor(public area: string, public exchange: string, public subscriber: string) {
  }
}

@Component({
  selector: 'app-proba123',
  template: `
    <div role="group" [formGroup]="parts">
      <input class="area" formControlName="area" maxlength="3">
      <span>&ndash;</span>
      <input class="exchange" formControlName="exchange" maxlength="3">
      <span>&ndash;</span>
      <input class="subscriber" formControlName="subscriber" maxlength="4">
    </div>
  `,
  styles: [`
    div {
      display: flex;
    }

    input {
      border: none;
      background: none;
      padding: 0;
      outline: none;
      font: inherit;
      text-align: center;
      color: currentColor;
    }
  `],
  providers: [{provide: MatFormFieldControl, useExisting: MyTel}]
})
export class Proba123Component implements MatFormFieldControl<MyTel>, OnDestroy {

  parts: FormGroup;
  stateChanges = new Subject<void>();

  @Input()
  get value(): MyTel | null {
    let n = this.parts.value;
    if (n.area.length == 3 && n.exchange.length == 3 && n.subscriber.length == 4) {
      return new MyTel(n.area, n.exchange, n.subscriber);
    }
    return null;
  }

  set value(tel: MyTel | null) {
    tel = tel || new MyTel('', '', '');
    this.parts.setValue({area: tel.area, exchange: tel.exchange, subscriber: tel.subscriber});
    this.stateChanges.next();
  }

  constructor(fb: FormBuilder) {
    this.parts = fb.group({
      'area': '',
      'exchange': '',
      'subscriber': '',
    });
  }
  ngOnDestroy() {
    this.stateChanges.complete();
  }

}
