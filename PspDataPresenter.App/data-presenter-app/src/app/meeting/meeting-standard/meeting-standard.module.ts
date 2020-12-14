import { PipesModule } from './../../_core/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingStandardComponent } from './meeting-standard.component';
import { MeetingStandardRoutingModule } from './meeting-standard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MeetingStandardRoutingModule,
    PipesModule
  ],
  declarations: [MeetingStandardComponent]
})
export class MeetingStandardModule { }
