import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {PaginationConfig, PaginationModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {CustomPaginationConfig} from "../common/ngx-bootstrap/custom-pagination.config";
import {BlogComponent} from "./blog/blog.component";
import {BlogListComponent} from "./blog/blog-list.component";
import {MarkdownModule} from "ngx-markdown";
import {BlogContentComponent} from "./blog/blog-content.component";
import {RouterModule} from "@angular/router";
import {SayingListComponent} from "./saying/saying-list.component";
import {MyMaterialModule} from "../common/my-material.module";
import {DateCustomPipe} from "../admin/pipe/date-custom.pipe";

@NgModule({
  declarations:[
    DateCustomPipe,
    HomeComponent,
    BlogComponent,
    BlogListComponent,
    BlogContentComponent,
    SayingListComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    MyMaterialModule,
    PaginationModule,
    MarkdownModule.forChild(),
    RouterModule
  ],
  exports:[],
  providers:[{provide:PaginationConfig,useClass:CustomPaginationConfig}]
})

export class HomeModule { }
