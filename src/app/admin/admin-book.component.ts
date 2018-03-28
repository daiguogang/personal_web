import {Component, OnInit, TemplateRef} from "@angular/core";
import {PageEvent} from "@angular/material";

import {BsModalRef, BsModalService, defineLocale} from 'ngx-bootstrap';
import {zhCn} from 'ngx-bootstrap/locale';
import {CallService} from "../common/service/call.service";

defineLocale('zh-cn', zhCn);


@Component({
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminBookComponent implements OnInit {
  // MatPaginator Inputs
  pageTotal:number;
  pageSize = 10;
  pageSizeOptions = [5, 10];
  // MatPaginator Output
  // pageEvent: PageEvent;
  pageNumber: number;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered'
  };

  typeOption = [
    {"id":0,"name":"技术教程类"},
    {"id":1,"name":"中文散文随笔类"},
    {"id":2,"name":"英文文学演讲类"}
    ];
  disableOption = [
    {"id":0,"name":"否"},
    {"id":1,"name":"是"}
  ];

  bookId:number;
  bookName: string;
  type: number;
  isDisabled: number;
  bookInfo: string;

  bookList: any;

  constructor(private modalService: BsModalService,
              private call: CallService) {
  }

  ngOnInit() {
    this.type = 0;
    this.isDisabled = 0;
    this.pageNumber = 1;


    this.queryBookList();
  }

  queryBookList() {
    this.call.callService("/book/page",
      {
        "currentPage": this.pageNumber,
        "pageSize": this.pageSize
      },
      (val) => {
      this.pageTotal = val.data.total;
      this.bookList = val.data.records;
      });
  }

  onOpenAddModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  onConfirm(): void {
    this.modalRef.hide();
    let url;
    if(this.bookId !== undefined && this.bookId !== null) {
      url = "/book/update";
    }else {
      url = "/book/add";
    }
    this.call.callService(url,
      {
        "bookId":this.bookId,
        "bookName": this.bookName,
        "type": this.type,
        "isDisabled": this.isDisabled,
        "bookInfo": this.bookInfo
      },
      (val) => {

        // 清空表单数据
        this.bookId = undefined;
        this.bookName = "";
        this.bookInfo = "";
        this.isDisabled = 0;
        this.type = 0;

        // 返回list
        this.queryBookList();

      });
  }

  onDecline(): void {
    this.modalRef.hide();
    // 清空表单数据
    this.bookId = undefined;
    this.bookName = "";
    this.bookInfo = "";
    this.isDisabled = 0;
    this.type = 0;
  }

  onPageChange(pageEvent) {
    this.pageNumber = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.queryBookList();
  }

  onDisableChange(e,item) {
    let isDisabled;
    if(e.checked === false) {
      isDisabled = 0;
    }else {
      isDisabled = 1;
    }
    this.call.callService("/book/update",
      {"bookId":item.bookId,"isDisabled":isDisabled},
      () => {

      });
  }

  onClickEdit(item,template) {
    this.bookId = item.bookId;
    this.bookName = item.bookName;
    this.bookInfo = item.bookInfo;
    this.isDisabled = item.isDisabled;
    this.type = item.type;
    this.onOpenAddModal(template);

  }


}
