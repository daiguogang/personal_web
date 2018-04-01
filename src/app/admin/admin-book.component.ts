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

  typeOption:any = [];
  disableOption = [
    {"id":0,"name":"否"},
    {"id":1,"name":"是"}
  ];

  bookId:number;
  bookName: string;
  type:any = "";
  isDisabled: number;
  bookInfo: string;

  bookList: any;

  keyWord:string;
  timeStart:Date;
  timeEnd:Date;
  typeQuery:any = "";

  constructor(private modalService: BsModalService,
              private call: CallService) {
  }

  ngOnInit() {
    this.initTypeOption();
    this.isDisabled = 0;
    this.pageNumber = 1;



    this.queryBookList();
  }

  initTypeOption() {
    this.call.callService("/type/list",{},
      (val) => {
        this.typeOption = val.data;
      });
  }

  getTypeName(value:number): string {
    const tempItem = this.typeOption.find((item) => item.typeId === value);
    return tempItem.typeName;
  }

  queryBookList() {
    this.call.callService("/book/page",
      {
        "currentPage": this.pageNumber,
        "pageSize": this.pageSize,
        "keyWord":this.keyWord,
        "timeStart":this.timeStart,
        "timeEnd":this.timeEnd,
        "type":this.typeQuery
      },
      (val) => {
      this.pageTotal = val.data.total;
      this.bookList = val.data.records;
      });
  }

  onOpenAddModal(template: TemplateRef<any>) {
    this.cleanQueryForm();
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
        this.cleanForm();

        // 返回list
        this.queryBookList();

      });
  }

  onDecline(): void {
    this.modalRef.hide();
    // 清空表单数据
    this.cleanForm();
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

  onTimeStartChange(value:Date):void {
    this.timeStart = value;
  }
  onTimeEndChange(value:Date):void {
    this.timeEnd = value;
  }

  onQueryList() {
    this.pageNumber = 1;
    this.queryBookList();
  }

  cleanQueryForm() {
    this.keyWord = '';
    this.timeStart = null;
    this.timeEnd = null;
    this.typeQuery = "";
  }

  cleanForm() {
    this.bookId = undefined;
    this.bookName = "";
    this.bookInfo = "";
    this.isDisabled = 0;
    this.type = "";
  }


}
