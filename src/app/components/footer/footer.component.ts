import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  icons = [
    { name: 'Home', path: 'assets/homeIcon.jpg', action: 'home' },
    { name: 'Search', path: 'assets/searchIcon.jpg', action: 'search' },
    { name: 'Post', path: 'assets/postIcon.jpg', action: 'post' },
    { name: 'Profile', path: 'assets/profileIcon.jpg', action: 'profile' }
  ];
  constructor(private router: Router) {}

  onIconClick(action: string) {
    switch (action) {
      case 'home':
        this.router.navigate(['/']); // or a dedicated home route
        break;
      case 'post':
        this.router.navigate(['/post-feed']);
        break;
      case 'search':
        this.router.navigate(['/search']);
        break;
      case 'profile':
        this.router.navigate(['/profile']);
        break;
    }
  }
}
