import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {HomeMainComponent} from "./home-main.component";
import {MatDatepickerModule} from "@angular/material";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {PaginationConfig, PaginationModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {CustomPaginationConfig} from "../common/ngx-bootstrap/custom-pagination.config";
import {BlogComponent} from "./blog/blog.component";
import {BlogListComponent} from "./blog/blog-list.component";
import {MarkdownModule} from "ngx-markdown";
import {BlogContentComponent} from "./blog/blog-content.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations:[
    HomeComponent,
    HomeMainComponent,
    BlogComponent,
    BlogListComponent,
    BlogContentComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    PaginationModule,
    MarkdownModule.forChild(),
    RouterModule
  ],
  exports:[],
  providers:[{provide:PaginationConfig,useClass:CustomPaginationConfig}]
})

export class HomeModule { }
