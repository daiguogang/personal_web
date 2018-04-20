import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {LoginStateMessageService} from "../login-state-message.service";
import {FormControl, Validators} from "@angular/forms";
import {Md5} from "ts-md5";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userAccount;
  password;
  message: string;

  hide = true;

  account = new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,15}$/))]);
  pass = new FormControl('', [Validators.required]);

  constructor(public authService: AuthService,
              private loginStateService: LoginStateMessageService,
              public router: Router) {

  }

  ngOnInit() {

    // reset login status
    this.authService.logout();
  }

  getAccountErrorMessage() {
    return this.account.hasError('required') ? 'You must enter a value' :
       'Requiring 5-16 letters or numbers, starting with a letter.';
  }

  getPassErrorMessage() {
    return this.pass.hasError('required') ? 'You must enter the password' : '';
  }


  login() {
    let saltPrefix = "Dylan";
    let saltSuffix = "Yim";
    this.userAccount = this.userAccount.trim();
    this.password = this.password.trim();
    let pass = Md5.hashStr(saltPrefix + this.password.toString() + saltSuffix);
    this.authService.login(
      "/auth",
      {"userAccount": this.userAccount, "password": pass}
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
        // this.router.navigate(['/login']);
      }
    });
  }

  cancel() {
    // this.authService.logout();
    // this.setMessage();
    this.router.navigate(['/home']);
  }


}
