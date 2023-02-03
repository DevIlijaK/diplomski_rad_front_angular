import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  @Input() isContainer = false;
  @Input() title: string;
  // @Input() withFab = false;
  // @Input() fabIcon: string;
  // @Input() tooltip: string;
  // @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() actions: ActionConfig[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }
}

export class ActionConfig {
  fabIcon: string;
  tooltip: string;
  onClick: any;

}
