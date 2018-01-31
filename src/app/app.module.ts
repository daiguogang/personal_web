import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HomeModule} from "./home/home.module";
import {AdminModule} from "./admin/admin.module";
import {LoginModule} from "./login/login.module";
import {AppRouting} from "./app.routing";
import {UserCommonModule} from "./common/user-common.module";
import {UserModule} from "./user/user.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,

    UserCommonModule,
    HomeModule,
    AdminModule,
    LoginModule,
    UserModule,
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
