import {Component, OnInit} from "@angular/core";
import {BlogParamMessageService} from "./service/blog-param-message.service";

@Component({
  templateUrl:'./home-content-detail.component.html',
  styleUrls:['./home.component.css'],
  providers:[]
})
export class HomeContentDetailComponent implements OnInit {

  testContent:string;
  contentId:number;
  categoryId:number;

  constructor(private paramMessage: BlogParamMessageService) {}

  ngOnInit() {
    debugger;
    this.testContent = this.paramMessage.data.contentTxt;
    let a =this.categoryId;
    let b = this.contentId;
  }


}
