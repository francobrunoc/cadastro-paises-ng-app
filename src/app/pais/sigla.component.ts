import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sigla',
  template: `
    <input [(ngModel)]="inputModel"
           (ngModelChange)="inputModelChange.emit(inputModel)"
           name="sigla"
           type="text"
           class="form-control"
           placeholder="Sigla"
           maxlength="2"
           required
           oninput="this.value = this.value.toUpperCase()">
  `
})
export class SiglaComponent implements OnInit {

  @Input() inputModel: string;
  @Output() inputModelChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
