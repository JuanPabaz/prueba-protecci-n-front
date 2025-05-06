import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthResquest } from '../../../../interfaces/auth-request';
import { AuthResponse } from '../../../../interfaces/auth-response';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  authRequest: AuthResquest = { username: '', password: '' };
  authResponse!: AuthResponse; 

  constructor(
    private auth_service: AuthService,
    private router: Router
  ){}

  login(authRequest: AuthResquest){
    this.auth_service.login(authRequest).subscribe({
      next: authResponse => {
        this.authResponse = authResponse;
        console.log(this.authResponse);
        const token = authResponse.accessToken;
        const refreshToken = authResponse.refreshToken;
        const payload = this.auth_service.getPayload(token);

        const user = { username: payload.sub };
        const login = {
          isAuth: true,
          username: user.username,
          role: authResponse.role,
          userId: payload.userId,
          image: payload.image
        }
        this.auth_service.token = token;
        this.auth_service.refreshToken = refreshToken;
        this.auth_service.user = login;
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err.error)
      }
    })
  }

  onSubmit(loginForm:NgForm){
    this.authRequest = loginForm.form.value;
    this.login(this.authRequest);
  }
}
