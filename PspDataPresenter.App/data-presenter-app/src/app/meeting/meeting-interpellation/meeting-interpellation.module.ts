import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingInterpellationComponent } from './meeting-interpellation.component';
import { MeetingInterpellationRoutingModule } from './meeting-interpellation-routing.module';
import { PipesModule } from '../../_core/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MeetingInterpellationRoutingModule,
    PipesModule
  ],
  declarations: [MeetingInterpellationComponent]
})
export class MeetingInterpellationModule { }
