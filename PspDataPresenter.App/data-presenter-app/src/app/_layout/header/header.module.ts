import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { StopwatchModule } from '../../_core/components/stopwatch/stopwatch.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StopwatchModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
