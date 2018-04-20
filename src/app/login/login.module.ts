import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login.component";
import {FormsModule} from "@angular/forms";
import {MyMaterialModule} from "../common/my-material.module";

@NgModule({
  declarations:[
    LoginComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    MyMaterialModule
  ],
  exports:[],
  providers:[]
})

export class LoginModule {}
