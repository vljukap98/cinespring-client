import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  signup() {
    const email = this.signupForm.get('email').value;
    const username = this.signupForm.get('username').value;
    const password = this.signupForm.get('password').value;

    this.authService.signup(email, username, password).subscribe(
      () => {
        this.router.navigateByUrl('/register-success');
      },
      (error) => {
        alert("Form input validation failed.\n" +
        "Please check if your input meets the requirements:\n" +
        "Username - 8-20 characters, no repeatin . or _ characters" +
        "Password - min. 8 characters, min 1 case letter, min 1 number, min 1 spec. character");
      }
    );
  }

}
