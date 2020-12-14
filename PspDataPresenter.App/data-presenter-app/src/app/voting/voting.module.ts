import { PipesModule } from './../_core/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingComponent } from './voting.component';
import { VotingRoutingModule } from './voting-routing.module';
import { AgendaItemPrintModule } from '../_core/components/agenda-item-title/agenda-item-print.module';
import { TimerModule } from '../_core/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    VotingRoutingModule,
    AgendaItemPrintModule,
    PipesModule,
    TimerModule
  ],
  declarations: [VotingComponent]
})
export class VotingModule { }
