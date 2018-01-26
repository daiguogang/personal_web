import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {HomeMainComponent} from "./home-main.component";

@NgModule({
  declarations:[
    HomeComponent,
    HomeMainComponent
  ],
  imports:[
    // CommonModule
  ],
  exports:[],
  providers:[]
})

export class HomeModule { }
