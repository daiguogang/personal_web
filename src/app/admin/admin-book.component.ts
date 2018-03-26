import {Component, OnInit} from "@angular/core";
import {PageEvent} from "@angular/material";

import { defineLocale } from 'ngx-bootstrap';
import { zhCn } from 'ngx-bootstrap/locale';
defineLocale('zh-cn', zhCn);

import {DatepickerConfig} from "ngx-bootstrap";


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


  onPageChange(pageEvent) {
    this.pageNumber =  pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
  }

}
