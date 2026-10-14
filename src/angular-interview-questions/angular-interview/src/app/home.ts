import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <h1>Angular Interview Questions 2026</h1>
    <p>Questions 1 to 3 run in Node: <code>node try/q01-computed.mts</code></p>
    <ul>
      @for (path of paths; track path) {
        <li><a [routerLink]="'/' + path">/{{ path }}</a></li>
      }
    </ul>
  `,
})
export class Home {
  protected paths = [
    'q4', 'q5', 'q6', 'q6-fix', 'q8', 'q8-fix', 'q9', 'q9-fix', 'q10', 'q10-hidden',
  ];
}
