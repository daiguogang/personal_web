import {Component} from "@angular/core";
import {MatDatepickerModule} from "@angular/material";

@Component({
  templateUrl:'./home-main.component.html',
  styleUrls:['./home.component.css']
})

export class HomeMainComponent {

  maxSize: number = 5;
  bigTotalItems: number = 175;
  bigCurrentPage: number = 1;
  numPages: number = 0;

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

}

