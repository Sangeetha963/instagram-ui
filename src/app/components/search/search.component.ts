import { Component } from '@angular/core';
import { MOCK_USERS } from './mock-users';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  query = '';
  users = MOCK_USERS;

  get filteredUsers() {
    const lowerQuery = this.query.toLowerCase();
    return this.users.filter(user =>
      user.username.toLowerCase().includes(lowerQuery) ||
      user.name.toLowerCase().includes(lowerQuery)
    );
  }
}
