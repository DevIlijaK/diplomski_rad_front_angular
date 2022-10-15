import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-primeri-angular-material',
  templateUrl: './primeri-angular-material.component.html',
  styleUrls: ['./primeri-angular-material.component.scss']
})
export class PrimeriAngularMaterialComponent implements OnInit {

  opened = false;
  options = ['123', '456', '789']
  objectOptions = [
    {name: 'Angular'},
    {name: 'Angular Material'},
    {name: 'React'},
    {name: 'Vue'}
  ]

  constructor() { }

  ngOnInit(): void {
  }
  log(event: any){
    console.log(event)
  }
  displayFn(subject){
    return subject ? subject.name : undefined;
  }
}
