import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProfileComponent} from "./profile.component";
import {MarkdownModule} from "ngx-markdown";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations:[
    ProfileComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    MarkdownModule.forChild()
  ],
  exports:[],
  providers:[]
})

export class UserModule {}
