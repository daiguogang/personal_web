import {NgModule} from "@angular/core";
import {
  MAT_DATE_LOCALE,
  MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatPaginatorIntl,
  MatPaginatorModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule, MatTooltipModule
} from "@angular/material";
import {MyMaterialPagination} from "./my-material-pagination";
import {ReactiveFormsModule} from "@angular/forms";

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
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTabsModule
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
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  providers:[
    {provide:MatPaginatorIntl,useClass:MyMaterialPagination},
    {provide: MAT_DATE_LOCALE, useValue: 'zh-CN'},
  ]
})

export class MyMaterialModule {}
