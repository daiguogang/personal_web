import {Component} from "@angular/core";
import {PageEvent} from "@angular/material";

@Component({
  templateUrl:'./admin-book.component.html',
  styleUrls:['./admin.component.css']
})
export class AdminBookComponent {
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];



  // MatPaginator Output
  // pageEvent: PageEvent;
  pageNumber:number;

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  // }
  onPageChange(pageEvent) {
    this.pageNumber =  pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
  }

}
