import {Component, OnInit, TemplateRef} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {CallService} from "../common/service/call.service";

@Component({
  templateUrl:'./admin-saying.component.html',
  styleUrls:['./admin.component.css']
})

export class AdminSayingComponent implements OnInit {
  // MatPaginator Inputs
  pageTotal:number;
  pageSize = 10;
  pageSizeOptions = [5, 10];
  // MatPaginator Output
  // pageEvent: PageEvent;
  pageNumber: number;

  modalRef: BsModalRef;
  modalRefDelete: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered'
  };

  disableOption = [
    {"id":0,"name":"否"},
    {"id":1,"name":"是"}
  ];

  keyWord:string;
  timeStart:Date;
  timeEnd:Date;
  isDisableQuery:any = "";
  isPoemQuery:any = "";
  isAlienQuery:any = "";

  id:number;
  content:string;
  originAuthor:string;
  isPoem:number;
  isAlien:number;
  isDisabled:number;

  sayingList:any;

  constructor(private modalService: BsModalService,
              private call: CallService) {
  }

  ngOnInit() {
    this.initData();
    this.pageNumber = 1;


    this.querySayingList();
  }

  initData() {
    this.isDisabled = 1;// 默认禁止
    this.isPoem = 0; // 默认否
    this.isAlien = 0;// 默认否
  }


  onOpenAddModal(template: TemplateRef<any>) {
    this.cleanQueryForm();
    this.modalRef = this.modalService.show(template, this.config);
  }

  onConfirm(): void {
    this.modalRef.hide();
    let url;
    if(this.id !== undefined && this.id !== null) {
      url = "/word/update";
    }else {
      url = "/word/add";
    }
    this.call.callService(url,
      {
        "id":this.id,
        "content": this.content,
        "originAuthor": this.originAuthor,
        "isDisabled": this.isDisabled,
        "isPoem": this.isPoem,
        "isAlien":this.isAlien
      },
      () => {
        // 清空表单数据
        this.cleanForm();
        // 返回list
        this.querySayingList();

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
    this.querySayingList();
  }

  onDisableChange(e,item) {
    const isDisabled = e.checked === false ? 0 : 1;
    this.call.callService("/word/update",
      {"id":item.id,"isDisabled":isDisabled},
      () => {
      });
  }

  onPoemChange(e,item) {
    const isPoem = e.checked === false ? 0 : 1;
    this.call.callService("/word/update",
      {"id":item.id,"isPoem":isPoem},
      ()=> {
      });
  }

  onAlienChange(e,item) {
    const isAlien = e.checked === false ? 0 : 1;
    this.call.callService("/word/update",
      {"id":item.id,"isAlien":isAlien},
      ()=> {
      });
  }

  onClickEdit(item,template) {
    this.id = item.id;
    this.content = item.content;
    this.originAuthor = item.originAuthor;
    this.isDisabled = item.isDisabled;
    this.isPoem = item.isPoem;
    this.isAlien = item.isAlien;
    this.onOpenAddModal(template);

  }

  onClickDelete(delete_template: TemplateRef<any>,item) {
    this.id = item.id;
    this.modalRefDelete = this.modalService.show(delete_template, this.config);

  }
  onDeleteConfirm() {
    this.call.callService("/word/delete",
      {"id":this.id},
      ()=> {
      });
    this.modalRefDelete.hide();
    this.querySayingList();
  }
  onDeleteDecline() {
    this.modalRefDelete.hide();
  }

  onTimeStartChange(value:Date):void {
    this.timeStart = value;
  }
  onTimeEndChange(value:Date):void {
    this.timeEnd = value;
  }

  onQueryList() {
    this.pageNumber = 1;
    this.querySayingList();
  }

  cleanQueryForm() {
    this.keyWord = '';
    this.timeStart = null;
    this.timeEnd = null;
    this.isAlienQuery = "";
    this.isDisableQuery = "";
    this.isPoemQuery = "";
  }

  cleanForm() {
    this.id = undefined;
    this.content = "";
    this.originAuthor = "";
    this.isDisabled = 1;
    this.isPoem = 0;
    this.isAlien = 0;
  }


  querySayingList() {
    this.call.callService("/word/page",
      {
        "currentPage": this.pageNumber,
        "pageSize": this.pageSize,
        "keyWord":this.keyWord,
        "timeStart":this.timeStart,
        "timeEnd":this.timeEnd,
        "isPoem":this.isPoemQuery,
        "isAlien":this.isAlienQuery,
        "isDisabled":this.isDisableQuery
      },
      (val) => {
        this.pageTotal = val.data.total;
        this.sayingList = val.data.records;
      });
  }
}
