import {NgModule} from "@angular/core";
import {MatButtonModule, MatIconModule, MatPaginatorIntl, MatPaginatorModule} from "@angular/material";
import {MyMaterialPagination} from "./my-material-pagination";

@NgModule({
  imports:[MatButtonModule,MatIconModule,MatPaginatorModule],
  exports:[MatButtonModule,MatIconModule,MatPaginatorModule],
  providers:[{provide:MatPaginatorIntl,useClass:MyMaterialPagination}]
})

export class MyMaterialModule {}
