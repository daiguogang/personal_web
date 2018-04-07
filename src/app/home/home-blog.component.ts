import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  templateUrl:'./home-blog.component.html',
  styleUrls:['./home.component.css']
})
export class HomeBlogComponent {

  blogList= [
    {"name":"1"},
    {"name":"2"},
    {"name":"3"},
    {"name":"4"},
    {"name":"5"},
    {"name":"6"},
    {"name":"7"},
    {"name":"8"},
    {"name":"9"},
    {"name":"10"}
    ];
  constructor(private router: Router) {}

  onDetail(item) {
    this.router.navigate(['detail']);
  }

}
