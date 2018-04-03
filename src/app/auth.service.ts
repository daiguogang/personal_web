import {Injectable} from "@angular/core";

import {Observable} from "rxjs/Observable";

import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {
  }

  login(url, data): Observable<boolean> {
    url = "http://localhost:8080" + url;
    return this.http.post<boolean>(
      url,
      data).pipe(
      tap(val => this.isLoggedIn = val)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }


}
