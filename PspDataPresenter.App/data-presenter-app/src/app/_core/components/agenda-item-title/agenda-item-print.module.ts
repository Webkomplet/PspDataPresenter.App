import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgendaItemPrintComponent } from './agenda-item-print.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [AgendaItemPrintComponent],
  exports: [AgendaItemPrintComponent]
})
export class AgendaItemPrintModule { }
