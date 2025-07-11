import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ Header, User ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('task-management-app');
}
