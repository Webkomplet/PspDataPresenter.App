import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchComponent } from './stopwatch.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StopwatchComponent],
  exports: [StopwatchComponent]
})
export class StopwatchModule { }
