import { Component, input } from '@angular/core';

export interface User {
  name: string;
}

@Component({
  selector: 'app-user-card',
  template: `<p>Hello, {{ user().name }}</p>`,
})
export class UserCard {
  user = input.required<User>();
}
