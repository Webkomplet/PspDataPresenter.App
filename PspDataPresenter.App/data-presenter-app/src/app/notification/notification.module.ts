import { PipesModule } from './../_core/pipes/pipes.module';
import { NotificationRoutingModule } from './notification-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    NotificationRoutingModule
  ],
  declarations: [NotificationComponent]
})
export class NotificationModule { }
