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
  bookId:number;
  contentTitle:string;
  contentTxt:string;
  status:number;

  articleList:any;

  constructor(private modalService: BsModalService,
              private call: CallService) {
  }

  ngOnInit() {


  }


  onOpenAddModal(template: TemplateRef<any>) {
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
      (val) => {

        // 清空表单数据


        // 返回list
        this.queryArticleList();

      });
  }

  onDecline(): void {
    this.modalRef.hide();
    // 清空表单数据

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

  }
}
