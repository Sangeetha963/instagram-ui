import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private router: Router) {}

  goToPostFeed() {
    console.log('entered')
    this.router.navigate(['/post-feed']);
    console.log('yes')
  }
  goToHome() {
  this.router.navigate(['/']);
}
}
