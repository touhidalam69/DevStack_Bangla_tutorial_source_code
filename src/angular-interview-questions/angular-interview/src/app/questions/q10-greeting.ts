import { Component } from '@angular/core';
import { Greeting } from './greeting';
import { GreetingHiddenRead } from './greeting-hidden-read';

@Component({
  selector: 'app-q10',
  imports: [Greeting],
  template: `<app-greeting name="Nadia" />`,
})
export class Q10 {}

@Component({
  selector: 'app-q10-hidden',
  imports: [GreetingHiddenRead],
  template: `<app-greeting-hidden-read name="Nadia" />`,
})
export class Q10Hidden {}
