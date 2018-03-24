

import {PaginationConfig} from "ngx-bootstrap";

export class CustomPaginationConfig extends PaginationConfig {
  main: any = {
    maxSize: void 0,
    itemsPerPage: 15,
    boundaryLinks: false,
    directionLinks: true,
    firstText: '首页',
    previousText: '上一页',
    nextText: '下一页',
    lastText: '尾页',
    pageBtnClass: '',
    rotate: true
  };
  pager: any = {
    itemPerPage: 15,
    previousText: '<<上一页',
    nextText:'下一页>>',
    pageBtnClass: '',
    align: true
  };
}
