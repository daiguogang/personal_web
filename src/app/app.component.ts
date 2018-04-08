import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {LoginStateMessageService} from "./login-state-message.service";
import {BlogParamMessageService} from "./home/service/blog-param-message.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[
    LoginStateMessageService,
    BlogParamMessageService
  ]
})
export class AppComponent implements OnInit,OnChanges {

  isLogged:boolean;

  constructor(private auth: AuthService,
              private loginStateService: LoginStateMessageService,
              private router: Router) {
    loginStateService.isLogin$.subscribe(
      loginState => {
        this.isLogged = loginState;
      }
    );
  }

  ngOnInit() {
    this.isLogged = this.auth.isLoggedIn();
  }

  ngOnChanges() {
    // this.isLogged = this.auth.isLoggedIn();
  }


  onLogout() {
    this.auth.logout();
    this.isLogged = false;
    this.router.navigate(['/home']);
  }

}
