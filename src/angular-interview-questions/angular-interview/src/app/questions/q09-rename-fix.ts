import { Component } from '@angular/core';
import { User, UserCard } from './user-card';

@Component({
  selector: 'app-rename-fix',
  imports: [UserCard],
  template: `
    <app-user-card [user]="user" />
    <button (click)="rename()">Rename</button>
  `,
})
export class RenameFix {
  user: User = { name: 'Rahim' };

  rename() {
    this.user = { ...this.user, name: 'Karim' };
  }
}
