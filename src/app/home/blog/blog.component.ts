import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CallService} from "../../common/service/call.service";
import {BlogParamMessageService} from "../service/blog-param-message.service";

@Component({
  templateUrl:'./blog.component.html',
  styleUrls:['../home.component.css'],
  providers:[]
})
export class BlogComponent implements OnInit {

  isBlog:number;

  // totalItems:number;
  // currentPage:number;
  // pageSize:number;
  pageTotal:number;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25];
  pageNumber: number;

  categoryList =[];
  saying:any = {content:"",originAuthor:""};

  blogList= [];

  constructor(private router: Router,
              private paramMessage: BlogParamMessageService,
              private call: CallService) {}


  ngOnInit() {
    this.isBlog = 1;// 1 是 0 否
    // this.pageSize = 10;
    // this.currentPage = 1;

    this.initData();

    this.queryPageList();
  }

  initData() {

    // type 1位技术博客类的分类
    this.call.callService("/front/categoryList",{"type":1},
      (val) => {
        this.categoryList = val.data;
      });
    // 随机查询1条名言
    this.call.callService("/front/sayingList",
      {
        "isPoem":0,
        "isDisabled":0,
        "count":1
      },
      (val) => {
        if(val.data.length > 0) {
          this.saying = val.data[0];
        }
      });
  }


  getCategoryName(value:number):string {
    const tempItem = this.categoryList.find((item => item.categoryId === value));
    return tempItem.categoryName;
  }

  onPageChange(pageEvent: any) {
    this.pageNumber = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.queryPageList();
  }

  queryPageList() {
    this.call.callService("/front/blogPageList",
      {
        "currentPage": this.pageNumber,
        "pageSize":this.pageSize,
        "isBlog":this.isBlog,
        "isPublic":1
      },
      (val) => {
        this.pageTotal = val.data.total;
        this.blogList = val.data.records;
      });
  }

  onDetail(item) {
    this.paramMessage.data = item;
    this.router.navigate(['blog/list',item.categoryId]);
  }

}
