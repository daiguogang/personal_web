import {Component, OnInit} from "@angular/core";
import {CallService} from "../../common/service/call.service";

@Component({
  templateUrl:'./saying-list.component.html',
  styleUrls:['../home.component.css']
})
export class SayingListComponent implements OnInit {

  sayingList:any;

  constructor(private call:CallService) {}

  ngOnInit() {

    this.querySayingList();
  }

  querySayingList() {
    // 随机查询最多15条数据
    this.call.callService("/front/sayingList",
      {
        "isPoem":0,
        "isDisabled":0,
        "count":15
      },
      (val) => {
        this.sayingList = val.data;
      });
  }

  onAdd() {
    // 弹出模态框，新增
  }

  onRefresh() {
    this.querySayingList();
  }

}

