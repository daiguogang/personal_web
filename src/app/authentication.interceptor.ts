import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

/**
 * 拦截器在请求头中添加token
 */
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accountToken = sessionStorage.getItem("currentAccount");
    if (accountToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + accountToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
