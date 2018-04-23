import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {PaginationConfig, PaginationModule, TooltipModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {CustomPaginationConfig} from "../common/ngx-bootstrap/custom-pagination.config";
import {BlogComponent} from "./blog/blog.component";
import {BlogListComponent} from "./blog/blog-list.component";
import {MarkdownModule} from "ngx-markdown";
import {BlogContentComponent} from "./blog/blog-content.component";
import {RouterModule} from "@angular/router";
import {SayingListComponent} from "./saying/saying-list.component";
import {MyMaterialModule} from "../common/my-material.module";
import {CustomPipeModule} from "../common/pipe/custom-pipe.module";

@NgModule({
  declarations:[
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
    CustomPipeModule,
    MarkdownModule.forChild(),
    TooltipModule.forRoot(),
    RouterModule
  ],
  exports:[],
  providers:[{provide:PaginationConfig,useClass:CustomPaginationConfig}]
})

export class HomeModule { }
