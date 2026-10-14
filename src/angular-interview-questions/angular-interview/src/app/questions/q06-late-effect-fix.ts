import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-late-effect-fix',
  template: `<p>count: {{ count() }}</p>`,
})
export class LateEffectFix {
  count = signal(0);

  constructor() {
    effect(() => console.log('count', this.count()));
  }
}
