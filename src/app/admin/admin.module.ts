import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AdminComponent} from "./admin.component";
import {AdminMainComponent} from "./admin-main.component";
import {AdminBlogComponent} from "./admin-blog.component";
import {RouterModule} from "@angular/router";
import {AdminCategoryComponent} from "./admin-category.component";
import {AdminSayingComponent} from "./admin-saying.component";
import {AdminUserComponent} from "./admin-user.component";
import {AdminCommentComponent} from "./admin-comment.component";
import {AdminBookComponent} from "./admin-book.component";
import {AdminBookArticleComponent} from "./admin-book-article.component";
import {MyMaterialModule} from "../common/my-material.module";
import {FormsModule} from "@angular/forms";
import {BsDatepickerModule, ModalModule} from "ngx-bootstrap";
import {CallService} from "../common/service/call.service";
import {MarkdownModule} from "ngx-markdown";
import {AdminContentComponent} from "./admin-content.component";
import {CustomPipeModule} from "../common/pipe/custom-pipe.module";


@NgModule({
  declarations:[
    AdminComponent,
    AdminMainComponent,
    AdminBlogComponent,
    AdminCategoryComponent,
    AdminSayingComponent,
    AdminUserComponent,
    AdminCommentComponent,
    AdminBookComponent,
    AdminBookArticleComponent,
    AdminContentComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    RouterModule,
    MyMaterialModule,
    CustomPipeModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    MarkdownModule.forChild()
  ],
  exports:[],
  providers:[CallService]
})

export class AdminModule {}
