import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: `<p>Hi, {{ name() }}</p>`,
})
export class Greeting implements OnInit {
  name = input.required<string>();

  ngOnInit() {
    console.log('name is', this.name());
  }
}
