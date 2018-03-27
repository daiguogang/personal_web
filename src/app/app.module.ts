import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HomeModule} from "./home/home.module";
import {AdminModule} from "./admin/admin.module";
import {LoginModule} from "./login/login.module";
import {AppRouting} from "./app.routing";
import {CustomCommonModule} from "./common/custom-common.module";
import {UserModule} from "./user/user.module";
import {MarkdownModule, MarkedOptions} from "ngx-markdown";
import {markedOptionsFactory} from "./common/markdown/marked-options-factory";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      provide:MarkedOptions,
      useFactory:markedOptionsFactory
    }),
    CustomCommonModule,
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
