import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-derived',
  template: `
    <p>total: {{ total() }} · copy: {{ copy() }}</p>
    <button (click)="add()">Add one</button>
  `,
})
export class Derived {
  qty = signal(1);
  total = computed(() => this.qty() * 100);
  copy = signal(0);
  sync = effect(() => this.copy.set(this.qty() * 100));

  add() {
    this.qty.set(2);
    console.log(this.total(), this.copy());
  }
}
