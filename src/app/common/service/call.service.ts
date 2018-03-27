import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

/**
 * 统一的服务调用入口，方便修改url
 */
@Injectable()
export class CallService {
  constructor(private http: HttpClient) {
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

