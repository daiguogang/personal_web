import {Component, OnInit, TemplateRef} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {CallService} from "../common/service/call.service";

@Component({
  templateUrl:'./admin-book-article.component.html',
  styleUrls:['./admin.component.css']

})

export class AdminBookArticleComponent implements OnInit {
  pageTotal:number;
  pageSize = 10;
  pageSizeOptions = [5, 10];
  pageNumber: number;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg modal-dialog-centered'
  };

  keyWord:string;
  timeStart:Date;
  timeEnd:Date;

  contentId:number;
  bookId:any = "";
  contentTitle:string;
  contentTxt:string;
  status:any = "";

  articleList:any;

  bookOption:any = [];
  statusOption:any = [];

  bookIdQuery:any = "";

  constructor(private modalService: BsModalService,
              private call: CallService) {
  }

  ngOnInit() {
    this.pageNumber = 1;
    this.initOption();
    this.queryArticleList();

  }

  initOption() {
    this.statusOption = [
      {"id":0,"name":"草稿"},
      {"id":1,"name":"正常发布"},
      {"id":2,"name":"回收站"}
    ];
    this.call.callService("/book/list",{},
      (val) => {
      const tempData = val.data;
      tempData.forEach((item) => {
        const ext = item.isDisabled === 0 ?"[正常]" : "[禁用]";
        item.bookName = ext+item.bookName;
      });
      this.bookOption = tempData;
      });
  }
  getBookName(value:number):string {
    const tempItem = this.bookOption.find((item) => item.bookId === value);
    return tempItem.bookName;
  }

  onOpenAddModal(template: TemplateRef<any>) {
    this.cleanQueryForm();
    this.modalRef = this.modalService.show(template, this.config);
  }

  onTimeStartChange(value:Date):void {
    this.timeStart = value;
  }
  onTimeEndChange(value:Date):void {
    this.timeEnd = value;
  }

  onConfirm(): void {
    this.modalRef.hide();
    let url;
    if(this.contentId !== undefined && this.contentId !== null) {
      url = "/bookContent/update";
    }else {
      url = "/bookContent/add";
    }
    this.call.callService(url,
      {
        "contentId":this.contentId,
        "bookId":this.bookId,
        "contentTitle": this.contentTitle,
        "contentTxt": this.contentTxt,
        "status": this.status
      },
      () => {

        // 清空表单数据
        this.cleanForm();

        // 返回list
        this.queryArticleList();

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
    this.queryArticleList();
  }

  onClickEdit(item,template) {
    this.contentId = item.contentId;
    this.bookId = item.bookId;
    this.contentTitle = item.contentTitle;
    this.contentTxt = item.contentTxt;
    this.status = item.status;
    this.onOpenAddModal(template);

  }

  queryArticleList() {
    this.call.callService("/bookContent/page",
      {
        "currentPage": this.pageNumber,
        "pageSize": this.pageSize,
        "keyWord":this.keyWord,
        "timeStart":this.timeStart,
        "timeEnd":this.timeEnd,
        "bookId":this.bookIdQuery
      },
      (val) => {
        this.pageTotal = val.data.total;
        this.articleList = val.data.records;
      });
  }
  onQueryList() {
    this.pageNumber = 1;
    this.queryArticleList();
  }

  cleanQueryForm() {
    this.keyWord = '';
    this.timeStart = null;
    this.timeEnd = null;
    this.bookIdQuery = "";
  }
  cleanForm() {
    this.contentId = undefined;
    this.bookId = "";
    this.contentTitle = "";
    this.contentTxt = "";
    this.status = "";
  }
}
