import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../auth.service";


/**
 * 统一的服务调用入口，方便修改url
 */
@Injectable()
export class CallService {
  constructor(private http: HttpClient,private authService:AuthService) {
  }

  callService(url, data, callback) {
    url = "http://localhost:8080" + url;
    this.http.post(url, data).subscribe(
      (val) => {
        callback(val);
      },
      response => {
        console.log("An error occurred while calling the POST request", response);
      },
      () => {
        console.log("Post request completed");
      }
    );
  }
}

