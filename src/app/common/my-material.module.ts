import {NgModule} from "@angular/core";
import {MatButtonModule, MatIconModule, MatPaginatorModule} from "@angular/material";

@NgModule({
  imports:[MatButtonModule,MatIconModule,MatPaginatorModule],
  exports:[MatButtonModule,MatIconModule,MatPaginatorModule]
})

export class MyMaterialModule {}
