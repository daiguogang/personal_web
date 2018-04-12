import {Component, OnInit,ChangeDetectorRef} from "@angular/core";
import {BlogParamMessageService} from "../service/blog-param-message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../common/service/call.service";

@Component({
  templateUrl:'./blog-list.component.html',
  styleUrls:['../home.component.css'],
  providers:[]
})
export class BlogListComponent implements OnInit {

  blogList:any;
  contentId:number;
  categoryId:number;
  path:string;


  constructor(private paramMessage: BlogParamMessageService,
              private router:Router,
              private call: CallService,
              private activeRoute:ActivatedRoute) {}

  ngOnInit() {

    this.activeRoute.params.subscribe(params => {this.categoryId = params.categoryId;});
    this.contentId = this.paramMessage.data ? this.paramMessage.data.contentId : undefined;
    this.path = "blog/list/"+this.categoryId+"/content";
    if(this.contentId !== undefined) {
      this.router.navigate([this.path,this.contentId]);
    }

    this.call.callService("/front/blogList",
      {
        "categoryId":this.categoryId,
        "isBlog":1,
        "isPublic":1
      },
      (val) => {
      this.blogList = val.data;
      });

  }



}
