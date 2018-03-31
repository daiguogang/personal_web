import {Component, OnInit, TemplateRef} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {CallService} from "../common/service/call.service";

@Component({
  templateUrl:'./admin-category.component.html',
  styleUrls:['./admin.component.css']
})

export class AdminCategoryComponent implements OnInit {
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

  keyWord:string;
  timeStart:Date;
  timeEnd:Date;

  categoryId:number;
  categoryName:string;
  description:string;
  type:number;
  isDisabled:number;

  categoryList:any;

  constructor(private modalService: BsModalService,
              private call: CallService) {
  }

  ngOnInit() {
    this.type = 0;
    this.isDisabled = 0;
    this.pageNumber = 1;


    this.queryCategoryList();
  }

  onOpenAddModal(template: TemplateRef<any>) {
    this.cleanQueryForm();
    this.modalRef = this.modalService.show(template, this.config);
  }

  onConfirm(): void {
    this.modalRef.hide();
    let url;
    if(this.categoryId !== undefined && this.categoryId !== null) {
      url = "/category/update";
    }else {
      url = "/category/add";
    }
    this.call.callService(url,
      {
        "categoryId":this.categoryId,
        "categoryName": this.categoryName,
        "type": this.type,
        "isDisabled": this.isDisabled,
        "description": this.description
      },
      (val) => {

        // 清空表单数据
        this.categoryId = undefined;
        this.categoryName = "";
        this.description = "";
        this.isDisabled = 0;
        this.type = 0;

        // 返回list
        this.queryCategoryList();

      });
  }

  onDecline(): void {
    this.modalRef.hide();
    // 清空表单数据
    this.categoryId = undefined;
    this.categoryName = "";
    this.description = "";
    this.isDisabled = 0;
    this.type = 0;
  }

  onPageChange(pageEvent) {
    this.pageNumber = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.queryCategoryList();
  }

  onDisableChange(e,item) {
    let isDisabled;
    if(e.checked === false) {
      isDisabled = 0;
    }else {
      isDisabled = 1;
    }
    this.call.callService("/category/update",
      {"categoryId":item.categoryId,"isDisabled":isDisabled},
      () => {

      });
  }

  onClickEdit(item,template) {
    this.categoryId = item.categoryId;
    this.categoryName = item.categoryName;
    this.description = item.description;
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
    this.queryCategoryList();
  }

  cleanQueryForm() {
    this.keyWord = '';
    this.timeStart = null;
    this.timeEnd = null;
  }


  queryCategoryList() {
    this.call.callService("/category/page",
      {
        "currentPage": this.pageNumber,
        "pageSize": this.pageSize,
        "keyWord":this.keyWord,
        "timeStart":this.timeStart,
        "timeEnd":this.timeEnd
      },
      (val) => {
        this.pageTotal = val.data.total;
        this.categoryList = val.data.records;
      });
  }
}
