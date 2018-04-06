import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {LoginStateMessageService} from "../login-state-message.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userAccount;
  password;
  message: string;

  constructor(public authService: AuthService,
              private loginStateService: LoginStateMessageService,
              public router: Router) {
    this.setMessage();

  }

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  setMessage() {
    this.message = "Logged" + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = "Trying to log in ...";
    this.authService.login(
      "/auth",
      {"userAccount": this.userAccount, "password": this.password}
    ).subscribe(result => {
      if (result) {
        this.loginStateService.loginState(result); // 向父组件传递登录成功状态
        // login successful
        // 从auth服务中获取重定向路径，如果没有使用默认值
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
        // 重定向
        this.router.navigate([redirect]);
      } else {
        // login failed
        this.message = "UserAccount or password is incorrect";
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }


}
