import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal-field',
  template: `<p>count: {{ count() }}</p>`,
})
export class SignalField {
  count = signal(0);

  constructor() {
    setTimeout(() => this.count.set(5), 1000);
  }
}
