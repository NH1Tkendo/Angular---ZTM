import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { User } from './user/user';
import { DUMMY_USERS } from './dummy-user';
import { Tasks } from './tasks/tasks';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, User, Tasks],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('first-angular-app');
  users = DUMMY_USERS;

  selectedUserID?: string;

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserID);
  }
  onSelectedUser(id: string) {
    this.selectedUserID = id;
  }
}
