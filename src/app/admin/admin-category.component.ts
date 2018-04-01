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

  typeOption:any = [];
  disableOption = [
    {"id":0,"name":"否"},
    {"id":1,"name":"是"}
  ];

  keyWord:string;
  timeStart:Date;
  timeEnd:Date;
  typeQuery:any = "";

  categoryId:number;
  categoryName:string;
  description:string;
  type:any = "";
  isDisabled:number;

  categoryList:any;

  constructor(private modalService: BsModalService,
              private call: CallService) {
  }

  ngOnInit() {
    this.initTypeOption();
    this.isDisabled = 0;
    this.pageNumber = 1;


    this.queryCategoryList();
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
        this.cleanForm();

        // 返回list
        this.queryCategoryList();

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
    this.typeQuery = "";
  }

  cleanForm() {
    this.categoryId = undefined;
    this.categoryName = "";
    this.description = "";
    this.isDisabled = 0;
    this.type = "";
  }


  queryCategoryList() {
    this.call.callService("/category/page",
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
        this.categoryList = val.data.records;
      });
  }
}
