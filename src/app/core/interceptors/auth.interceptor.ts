import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken = localStorage.getItem("access_token")
      if (!authToken) {
        return next.handle(req)
      }

      const authRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` }
      })
      return next.handle(authRequest)
  }
}
