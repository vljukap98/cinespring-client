import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cinespring-client';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private ngZone: NgZone, private router: Router) {  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data) => this.isLoggedIn = data)
    this.isLoggedIn = this.authService.isLoggedIn();
    this.checkIfTokenExpired();
  }

  checkIfTokenExpired() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        const now = new Date().getTime();

        if(this.isLoggedIn && (now > this.authService.getExpires())) {
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }
      }, 1);
    });
  }
}
