import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Output() btnClick = new EventEmitter();
  active:boolean = false;

  onClick() {
    this.btnClick.emit();
    this.active = !this.active;
  }
}
