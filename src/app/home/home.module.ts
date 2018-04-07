import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {HomeMainComponent} from "./home-main.component";
import {MatDatepickerModule} from "@angular/material";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {PaginationConfig, PaginationModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {CustomPaginationConfig} from "../common/ngx-bootstrap/custom-pagination.config";
import {HomeBlogComponent} from "./home-blog.component";

@NgModule({
  declarations:[
    HomeComponent,
    HomeMainComponent,
    HomeBlogComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    PaginationModule
  ],
  exports:[],
  providers:[{provide:PaginationConfig,useClass:CustomPaginationConfig}]
})

export class HomeModule { }
