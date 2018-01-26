import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isHome:boolean;
  isAdmin:boolean;
  isLogin:boolean;
  ngOnInit() {
    this.isHome = true;
    this.isAdmin = false;
    this.isLogin = false;
  }
}
