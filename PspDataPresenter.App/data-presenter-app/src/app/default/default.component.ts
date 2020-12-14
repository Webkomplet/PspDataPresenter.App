import { fadeAnimation } from './../_core/animations/fade.animation';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent implements OnInit, OnDestroy {

  public votingButtonExpanded = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
