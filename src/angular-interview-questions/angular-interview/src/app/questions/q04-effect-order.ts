import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-effect-order',
  template: `<p>count: {{ count() }}</p>`,
})
export class EffectOrder {
  count = signal(0);

  constructor() {
    effect(() => console.log('effect', this.count()));
    this.count.set(1);
    this.count.set(2);
    console.log('constructor done');
  }
}
