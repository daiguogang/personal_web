import {Component} from "@angular/core";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})

export class LoginComponent {

  userAccount;
  password;

  message: string;
  constructor(public authService:AuthService,public router:Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = "Logged" + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = "Trying to log in ...";
    this.authService.login(
      "/login/login",
      {"userAccount":this.userAccount,"password":this.password}
      ).subscribe(() => {
      this.setMessage();
      if(this.authService.isLoggedIn) {
        // 从auth服务中获取重定向路径，如果没有使用默认值
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
        // 重定向
        this.router.navigate([redirect]);
      }else {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

}
