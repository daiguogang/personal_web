import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CallService} from "../../common/service/call.service";

@Component({
  selector:'app-blog-content',
  templateUrl:'./blog-content.component.html',
  styleUrls:['../home.component.css']
})

export class BlogContentComponent implements OnInit {

  contentId:number;
  contentTxt:string;
  updateTime:any;
  views:number;
  like:number;
  unlike:number;

  isLike = false;
  isUnlike = false;

  constructor(private activeRoute:ActivatedRoute,
              private call:CallService) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.contentId = params.contentId;
      this.isLike = false;
      this.isUnlike = false;
      this.getBlogContent();
    });

  }


  getBlogContent() {
    this.call.callService("/front/blogContent",
      {
        "contentId":this.contentId
      },
      (val) => {
        this.contentTxt = val.data.contentTxt;
        this.updateTime = val.data.updateTime;
        this.views = val.data.views;
        this.like = val.data.like;
        this.unlike = val.data.unlike;
      });
  }

  onLikeClick() {
    this.isLike = true;
    this.call.callService("/front/blogCountUpdate",
      {
        "contentId":this.contentId,
        "like":this.like+1
      },
      () => {

      });
  }

  onUnlikeClick() {
    this.isUnlike = true;
    this.call.callService("/front/blogCountUpdate",
      {
        "contentId":this.contentId,
        "unlike":this.unlike+1
      },
      () => {

      });
  }


}
