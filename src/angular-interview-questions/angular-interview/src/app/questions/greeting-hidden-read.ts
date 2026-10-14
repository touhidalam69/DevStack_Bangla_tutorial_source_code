import { Component, input } from '@angular/core';

@Component({
  selector: 'app-greeting-hidden-read',
  template: `<p>Hi, {{ name() }}</p>`,
})
export class GreetingHiddenRead {
  name = input.required<string>();

  constructor() {
    this.logName();
  }

  logName() {
    console.log('name is', this.name());
  }
}
