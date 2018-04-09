import {Component, OnInit} from "@angular/core";
import {BlogParamMessageService} from "../service/blog-param-message.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl:'./blog-list.component.html',
  styleUrls:['../home.component.css'],
  providers:[]
})
export class BlogListComponent implements OnInit {

  testContent:string;
  contentId:number;
  categoryId:number;

  constructor(private paramMessage: BlogParamMessageService,
              private router:Router,
              private activeRoute:ActivatedRoute) {}

  ngOnInit() {
    debugger;
    this.categoryId = this.activeRoute.snapshot.params["categoryId"];
    // this.contentId = this.activeRoute.snapshot.params["contentId"];
    this.contentId = this.paramMessage.data ? this.paramMessage.data.contentId : undefined;
    let path = "blog/list/"+this.categoryId+"/content";
    if(this.contentId !== undefined) {
      this.router.navigate([path,this.contentId]);
    }

  }


}
