import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.html',
  styleUrls: ['./popup.css']
})
export class Popup {
  @Input() title: string = '';
  @Input() show: boolean = false;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.show = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
