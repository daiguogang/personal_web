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
import {AdminArticleComponent} from "./admin-article.component";
import {MyMaterialModule} from "../common/my-material.module";

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
    AdminArticleComponent
  ],
  imports:[
    CommonModule,
    RouterModule,
    MyMaterialModule
  ],
  exports:[],
  providers:[]
})

export class AdminModule {}
