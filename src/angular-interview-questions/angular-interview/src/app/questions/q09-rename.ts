import { Component } from '@angular/core';
import { User, UserCard } from './user-card';

@Component({
  selector: 'app-rename',
  imports: [UserCard],
  template: `
    <app-user-card [user]="user" />
    <button (click)="rename()">Rename</button>
  `,
})
export class Rename {
  user: User = { name: 'Rahim' };

  rename() {
    this.user.name = 'Karim';
  }
}
