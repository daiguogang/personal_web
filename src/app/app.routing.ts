import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./common/page-not-found.component";
import {ProfileComponent} from "./user/profile.component";
import {AdminMainComponent} from "./admin/admin-main.component";
import {AdminBlogComponent} from "./admin/admin-blog.component";
import {AdminCategoryComponent} from "./admin/admin-category.component";
import {AdminSayingComponent} from "./admin/admin-saying.component";
import {AdminUserComponent} from "./admin/admin-user.component";
import {AdminCommentComponent} from "./admin/admin-comment.component";
import {AdminBookComponent} from "./admin/admin-book.component";
import {AdminBookArticleComponent} from "./admin/admin-book-article.component";
import {AdminContentComponent} from "./admin/admin-content.component";
import {AuthGuard} from "./auth-guard.service";
import {BlogComponent} from "./home/blog/blog.component";
import {BlogListComponent} from "./home/blog/blog-list.component";
import {BlogContentComponent} from "./home/blog/blog-content.component";
import {SayingListComponent} from "./home/saying/saying-list.component";

const routes:Routes = [
  {path:'home',component:HomeComponent},
  {path:'blog',component:BlogComponent},
  {path:'blog/list/:categoryId',component:BlogListComponent,children:[
    {path:"content/:contentId",component:BlogContentComponent}
  ]},
  {path:"saying",component:SayingListComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},

  {path:'admin',
    component:AdminComponent,
    canActivate:[AuthGuard],
    children:[
    {path:'',children:[
      {path:'main',component:AdminMainComponent},
      {path:'blog',component:AdminBlogComponent},
      {path:'content',component:AdminContentComponent},
      {path:'category',component:AdminCategoryComponent},
      {path:'saying',component:AdminSayingComponent},
      {path:'user',component:AdminUserComponent},
      {path:'comment',component:AdminCommentComponent},
      {path:'book',component:AdminBookComponent},
      {path:'article',component:AdminBookArticleComponent}
    ]}


  ]},
  {path: '', redirectTo: '/blog', pathMatch: 'full'},
  {path: '**',component:PageNotFoundComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule],
  providers:[]
})

export class AppRouting {}
