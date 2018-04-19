import {Component, OnInit, TemplateRef} from "@angular/core";
import {CallService} from "../../common/service/call.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {MatSnackBar} from "@angular/material";


@Component({
  templateUrl:'./saying-list.component.html',
  styleUrls:['../home.component.css']
})
export class SayingListComponent implements OnInit {

  sayingList:any;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered'
  };

  isDisabled = 1; // 用户提交的都默认为禁用状态，审核后方可显示
  content:string;
  originAuthor:string;
  provider:string;
  isPoem = 0;
  isAlien = 0;

  constructor(private modalService: BsModalService,
              private snackBar:MatSnackBar,
              private call:CallService) {}

  ngOnInit() {

    this.querySayingList();
  }

  querySayingList() {
    // 随机查询最多5条数据
    this.call.callService("/front/sayingList",
      {
        "isPoem":0,
        "isDisabled":0,
        "count":5
      },
      (val) => {
        this.sayingList = val.data;
      });
  }


  onOpenAddModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  onConfirm(): void {
    this.modalRef.hide();
    this.call.callService("/front/wordAdd",
      {
        "content": this.content,
        "originAuthor": this.originAuthor,
        "provider":this.provider,
        "isDisabled": this.isDisabled,
        "isPoem": this.isPoem,
        "isAlien":this.isAlien
      },
      (val) => {
        // 清空表单数据
        this.cleanForm();

        let flag = val.success;
        // 弹出Modal
        let message,className;
        if(flag) {
          message = "保存成功";
          className = "notice-bg-success";
        }else {
          message = "保存失败，请联系管理员";
          className = "notice-bg-danger";
        }
        this.openSnackBar(message, className);
      });
  }

  openSnackBar(msg,className) {
    this.snackBar.open(msg,"",
      {
        duration:2000,
        panelClass:className,
        verticalPosition:"top"
      }
    );
  }

  onDecline(): void {
    this.modalRef.hide();
    // 清空表单数据
    this.cleanForm();
  }

  cleanForm() {
    this.content = "";
    this.originAuthor = "";
    this.provider = "";
    this.isPoem = 0;
    this.isAlien = 0;
  }

  onRefresh() {
    this.querySayingList();
  }

  onPoemChange(e) {
    this.isPoem = e.checked === false ? 0 : 1;
  }

  onAlienChange(e) {
    this.isAlien = e.checked === false ? 0 : 1;
  }

}

