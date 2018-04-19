import {NgModule} from "@angular/core";
import {
  MAT_DATE_LOCALE,
  MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorIntl,
  MatPaginatorModule, MatSlideToggleModule, MatSnackBarModule, MatTooltipModule
} from "@angular/material";
import {MyMaterialPagination} from "./my-material-pagination";

@NgModule({
  imports:[
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  exports:[
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  providers:[
    {provide:MatPaginatorIntl,useClass:MyMaterialPagination},
    {provide: MAT_DATE_LOCALE, useValue: 'zh-CN'},
  ]
})

export class MyMaterialModule {}
