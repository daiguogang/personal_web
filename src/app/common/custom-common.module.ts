import {NgModule} from "@angular/core";
import {PageNotFoundComponent} from "./page-not-found.component";
import {PaginationConfig, PaginationModule} from "ngx-bootstrap";
import {CustomPaginationConfig} from "./ngx-bootstrap/custom-pagination.config";

@NgModule({
  declarations:[
    PageNotFoundComponent
  ],
  imports:[PaginationModule],
  exports:[],
  providers:[{provide:PaginationConfig,useClass:CustomPaginationConfig}]
})

export class CustomCommonModule { }
