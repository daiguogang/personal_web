import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl:'./blog-content.component.html',
  styleUrls:['../home.component.css']
})

export class BlogContentComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute) {}

  ngOnInit() {
    debugger;
    let contentId = this.activeRoute.snapshot.params["contentId"];
  }

}
