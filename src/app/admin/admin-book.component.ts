import {Component, OnInit, TemplateRef} from "@angular/core";
import {PageEvent} from "@angular/material";

import {BsModalRef, BsModalService, defineLocale} from 'ngx-bootstrap';
import { zhCn } from 'ngx-bootstrap/locale';
import {CallService} from "../common/service/call.service";
defineLocale('zh-cn', zhCn);



@Component({
  templateUrl:'./admin-book.component.html',
  styleUrls:['./admin.component.css']
})
export class AdminBookComponent {
  // MatPaginator Inputs
  length = 100;
  pageSize = 15;
  pageSizeOptions = [5, 10, 15];
  // MatPaginator Output
  // pageEvent: PageEvent;
  pageNumber:number;

  modalRef:BsModalRef;
  config = {
    backdrop:true,
    ignoreBackdropClick:true,
    class: 'modal-dialog-centered'
  };

  bookName:string;
  type:number;
  isDisabled:number;
  bookInfo:string;

  constructor(private modalService:BsModalService,
              private call:CallService) {}

  onOpenAddModal(template:TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }

  onConfirm():void {
    this.modalRef.hide();
    this.call.callService("/book/add",
      {"bookName":this.bookName,
            "type":this.type,
            "isDisabled":this.isDisabled,
            "bookInfo":this.bookInfo},
      (val) => {
      debugger;
      });
  }

  onDecline():void {
    this.modalRef.hide();
  }

  onPageChange(pageEvent) {
    this.pageNumber =  pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
  }

}
