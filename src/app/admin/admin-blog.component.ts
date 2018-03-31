import {Component, OnInit, TemplateRef} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {CallService} from "../common/service/call.service";

@Component({
  templateUrl:'./admin-blog.component.html',
  styleUrls:['./admin.component.css']
})

export class AdminBlogComponent implements OnInit {
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
  categoryId:any = "";
  contentTitle:string;
  contentTxt:string;
  contentDesc:string;
  status:any = "";
  type:number;

  blogList:any;

  categoryOption:any;
  statusOption:any;

  constructor(private modalService: BsModalService,
              private call: CallService) {
  }

  ngOnInit() {
    this.type = 0; // 博客需要的分类都是 技术类
    this.pageNumber = 1;
    this.initOption();
    this.queryBlogList();

  }

  initOption() {
    this.statusOption = [
      {"id":0,"name":"草稿"},
      {"id":1,"name":"正常发布"},
      {"id":2,"name":"回收站"}
    ];
    this.call.callService("/category/list",{"type":this.type},
      (val) => {
        this.categoryOption = val.data;
      });
  }

  getCategoryName(value:number):string {
    let name = "";
    this.categoryOption.forEach((item) => {
      if(item.categoryId === value) {
        name = item.categoryName;
      }
    });
    return name;
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
      url = "/content/update";
    }else {
      url = "/content/add";
    }
    this.call.callService(url,
      {
        "contentId":this.contentId,
        "categoryId":this.categoryId,
        "contentTitle": this.contentTitle,
        "contentTxt": this.contentTxt,
        "contentDesc":this.contentDesc,
        "status": this.status
      },
      () => {

        // 清空表单数据
        this.cleanForm();

        // 返回list
        this.queryBlogList();

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
    this.queryBlogList();
  }

  onClickEdit(item,template) {
    this.contentId = item.contentId;
    this.categoryId = item.categoryId;
    this.contentTitle = item.contentTitle;
    this.contentTxt = item.contentTxt;
    this.contentDesc = item.contentDesc;
    this.status = item.status;
    this.onOpenAddModal(template);

  }

  queryBlogList() {
    this.call.callService("/content/page",
      {
        "currentPage": this.pageNumber,
        "pageSize": this.pageSize,
        "keyWord":this.keyWord,
        "timeStart":this.timeStart,
        "timeEnd":this.timeEnd
      },
      (val) => {
        this.pageTotal = val.data.total;
        this.blogList = val.data.records;
      });
  }
  onQueryList() {
    this.pageNumber = 1;
    this.queryBlogList();
  }

  cleanQueryForm() {
    this.keyWord = '';
    this.timeStart = null;
    this.timeEnd = null;
  }

  cleanForm() {
    this.contentId = undefined;
    this.categoryId = "";
    this.contentTitle = "";
    this.contentTxt = "";
    this.contentDesc = "";
    this.status = "";
  }

}
