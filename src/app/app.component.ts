import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cinespring-client';

  constructor(private authService: AuthService) {
    const now = new Date().getTime();

    if(now > this.authService.getExpires()) {
      this.authService.logout();
    }
  }
}
