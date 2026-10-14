import { Component, effect, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-late-effect',
  template: `<p>count: {{ count() }}</p>`,
})
export class LateEffect implements OnInit {
  count = signal(0);

  ngOnInit() {
    effect(() => console.log('count', this.count()));
  }
}
