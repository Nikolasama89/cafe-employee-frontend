import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

// Interceptor πιανει καθε http request που φευγει απο τον HttpClient
// Αν υπαρχει access token το βαζει στο Authorization Bearer

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken = localStorage.getItem("access_token")
      if (!authToken) {
        return next.handle(req)
      }
      
      // To request ειναι immutable οποτε δεν το αλλαζουμε
      // Κανουμε clone και προσθετουμε το Authorization: Bearer <token>.
      const authRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` }
      })
      return next.handle(authRequest)
  }
}
