import {NgModule} from "@angular/core";
import {DateCustomPipe} from "./date-custom.pipe";
import {IsDisablePipe} from "./is-disable.pipe";
import {StatusPipe} from "./status.pipe";

@NgModule({
  declarations:[
    DateCustomPipe,
    IsDisablePipe,
    StatusPipe
  ],
  exports:[
    DateCustomPipe,
    IsDisablePipe,
    StatusPipe
  ]
})

export class CustomPipeModule {}
