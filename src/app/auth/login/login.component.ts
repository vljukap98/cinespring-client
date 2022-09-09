import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameEmpty: boolean = false;
  passwordEmpty: boolean = false;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.authService.login(username, password).subscribe(data => {
      if(data) {
        this.router.navigateByUrl('/');
      }
    },
    (error) => {
      console.log(error)
      alert("Please check your input." +
      "If you haven't confirmed your account, please check your email."+
      "Otherwise you won't be able to log in.")
    });
  }

}
