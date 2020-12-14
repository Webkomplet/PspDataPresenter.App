import { PipesModule } from './../_core/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgendaItemPrintModule } from '../_core/components/agenda-item-title/agenda-item-print.module';
import { VotingResultsRoutingModule } from './voting-results-routing.module';
import { VotingResultsComponent } from './voting-results.component';

@NgModule({
  imports: [
    CommonModule,
    VotingResultsRoutingModule,
    AgendaItemPrintModule,
    PipesModule
  ],
  declarations: [VotingResultsComponent]
})
export class VotingResultsModule { }
