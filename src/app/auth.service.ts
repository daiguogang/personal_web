import {Injectable} from "@angular/core";

import {Observable} from "rxjs/Observable";

import {catchError, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs/observable/of";



@Injectable()
export class AuthService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {
  }

  login(url, data): Observable<boolean> {
    url = "http://localhost:8080" + url;
    return this.http.post<any>(
      url,
      data).pipe(
      tap(response => {
        let token = response.token;
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem("currentAccount", token);
          return true;
        } else {
          return false;
        }
      }),
      catchError((err) => {
        console.error(err);
        return of(false);
      })
    );
  }

  getToken(): string {
    return sessionStorage.getItem("currentAccount");
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    sessionStorage.removeItem("currentAccount");
  }

  isLoggedIn(): boolean {
    let token: string = this.getToken();
    return token && token.length > 0;
  }

}
