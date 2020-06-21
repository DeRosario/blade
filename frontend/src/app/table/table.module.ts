import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LineBreakerPipe } from '../pipe/line-breaker.pipe';
import { DateFormatterPipe } from '../pipe/date-formatter.pipe';



@NgModule({
  declarations: [
    TableComponent,
    LineBreakerPipe,
    DateFormatterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
