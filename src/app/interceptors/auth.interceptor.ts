import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token;
  if (token != undefined){
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer '+token)
    });
    return next(authRequest);
  }
  return next(req);
};
