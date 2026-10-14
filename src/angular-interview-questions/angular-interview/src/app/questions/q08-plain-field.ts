import { Component } from '@angular/core';

@Component({
  selector: 'app-plain-field',
  template: `
    <p>count: {{ count }}</p>
    <button (click)="refresh()">Refresh</button>
  `,
})
export class PlainField {
  count = 0;

  constructor() {
    setTimeout(() => (this.count = 5), 1000);
  }

  // Does nothing: it is only a template event.
  refresh() {}
}
