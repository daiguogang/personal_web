import {Component, OnInit, TemplateRef} from "@angular/core";
import {CallService} from "../../common/service/call.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

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
              private call:CallService) {}

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
      () => {
        // 清空表单数据
        this.cleanForm();
        // TODO 提示保存成功 modal
      });
  }

  onDecline(): void {
    this.modalRef.hide();
    // 清空表单数据
    this.cleanForm();
  }

  cleanForm() {
    this.content = "";
    this.originAuthor = "";
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

