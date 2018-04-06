import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class LoginStateMessageService {

  // Observable boolean sources
  private isLoginSource = new Subject<boolean>();

  // Observable boolean streams
  isLogin$ = this.isLoginSource.asObservable();

  // Service message commands
  loginState(state: boolean) {
    this.isLoginSource.next(state);
  }
}
