import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgendaItemPrintModule } from '../_core/components/agenda-item-title/agenda-item-print.module';
import { PipesModule } from '../_core/pipes/pipes.module';
import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MeetingRoutingModule,
    PipesModule,
    AgendaItemPrintModule
  ],
  declarations: [
    MeetingComponent
  ]
})
export class MeetingModule { }
