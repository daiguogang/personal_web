import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CallService} from "../common/service/call.service";
import {BlogParamMessageService} from "./service/blog-param-message.service";

@Component({
  templateUrl:'./home-blog.component.html',
  styleUrls:['./home.component.css'],
  providers:[]
})
export class HomeBlogComponent implements OnInit {

  isBlog:number;

  totalItems:number;
  currentPage:number;
  pageSize:number;

  blogList= [];

  constructor(private router: Router,
              private paramMessage: BlogParamMessageService,
              private call: CallService) {}


  ngOnInit() {
    this.isBlog = 1;// 1 是 0 否
    this.pageSize = 10;
    this.currentPage = 1;

    this.queryPageList();
  }

  onPageChanged(event: any) {
    this.currentPage = event.page;
    this.queryPageList();
  }

  queryPageList() {
    this.call.callService("/front/blogPageList",
      {
        "currentPage":this.currentPage,
        "pageSize":this.pageSize,
        "isBlog":this.isBlog
      },
      (val) => {
        this.totalItems = val.data.total;
        this.blogList = val.data.records;
      });
  }

  onDetail(item) {
    this.paramMessage.data = item;
    this.router.navigate(['detail',item.contentId]);
  }

}
