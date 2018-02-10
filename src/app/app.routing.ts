import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./common/page-not-found.component";
import {HomeMainComponent} from "./home/home-main.component";
import {ProfileComponent} from "./user/profile.component";
import {AdminMainComponent} from "./admin/admin-main.component";
import {AdminBlogComponent} from "./admin/admin-blog.component";
import {AdminCategoryComponent} from "./admin/admin-category.component";
import {AdminSayingComponent} from "./admin/admin-saying.component";
import {AdminUserComponent} from "./admin/admin-user.component";
import {AdminCommentComponent} from "./admin/admin-comment.component";

const routes:Routes = [
  {path:'home',component:HomeComponent},
  {path:'main/:type',component:HomeMainComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'admin',component:AdminComponent,children:[
    {path:'main',component:AdminMainComponent},
    {path:'blog',component:AdminBlogComponent},
    {path:'category',component:AdminCategoryComponent},
    {path:'saying',component:AdminSayingComponent},
    {path:'user',component:AdminUserComponent},
    {path:'comment',component:AdminCommentComponent}

  ]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**',component:PageNotFoundComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRouting {}
