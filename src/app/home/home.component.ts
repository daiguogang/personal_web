import {Component, OnInit} from "@angular/core";
import {CallService} from "../common/service/call.service";

@Component({
  selector:'app-home',
  templateUrl:'./home.component.html',
  styleUrls:['./home.component.css']
})

export class HomeComponent implements OnInit {

  poemText = [];

  constructor(private call: CallService) {}

  ngOnInit() {

    this.queryPoem();

  }

  queryPoem() {
    // 随机查询1条诗词
    this.call.callService("/front/sayingList",
      {
        "isPoem":1,
        "isDisabled":0,
        "count":1
      },
      (val) => {
        if(val.data.length > 0) {
          this.poemText = this.pretreatmentPoem(val.data[0].content);
        }
      });
  }

  pretreatmentPoem(tempTxt:string): string[] {
    let regEN = /[,!?.:]/g; // 英文标点正则
    let regCN = /[\u3002|\uff1f|\uff01|\uff0c|\uff1b|\uff1a]/g; // 中文标点：句号，问号，感叹号，逗号，分号,冒号正则
    tempTxt = tempTxt.replace(regEN,"，");// 将英文标点替换为中文逗号
    tempTxt = tempTxt.replace(regCN,"，");// 将中文标点替换为中文逗号
    tempTxt = (tempTxt.substring(tempTxt.length-1)==="，")
      ?tempTxt.substring(0,tempTxt.length-1)
      :tempTxt; // 如果末尾是逗号，去除逗号
    return tempTxt.split("，"); // 按中文逗号拆分成数组
  }

  itemContent(item) {
    let temp = item;
    let i = 0;
    let timer = setInterval(() => {
      item = temp.substring(0,i);
      i++;
      if(item.length === temp.length) {
        clearInterval(timer);
      }
    },100);
  }




}
