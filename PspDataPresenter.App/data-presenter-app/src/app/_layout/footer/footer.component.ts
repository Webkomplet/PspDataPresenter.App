import { StopwatchModel } from './../../_core/models/stopwatch.model';
import { Component, OnInit } from '@angular/core';
import { SignalrService } from './../../_core/services/signalr/signalr.service';
import { StopwatchService } from './../../_core/services/stopwatch/stopwatch.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  constructor(
    private _signalrService: SignalrService,
    private _stopwatchService: StopwatchService
  ) { }

  ngOnInit() {
  }

  connect() {
    this._signalrService.connect();
  }

  disconnect() {
    this._signalrService.disconnect();
  }

  stopwatchStart() {
    var t = new Date();
    var t2 = new Date();
    t2.setSeconds(t2.getSeconds() + 10);
    let model = { start: t, end: t2, eventType: 'start' } as StopwatchModel;
    this._stopwatchService.propagateChange(model);
  }

  stopwatchPause() {
    var t = new Date();
    var t2 = new Date();
    t2.setSeconds(t2.getSeconds() + 10);
    let model = { start: t, end: t2, eventType: 'pause' } as StopwatchModel;
    this._stopwatchService.propagateChange(model);
  }

  stopwatchEnd() {
    var t = new Date();
    var t2 = new Date();
    t2.setSeconds(t2.getSeconds() + 10);
    let model = { start: t, end: t2, eventType: 'stop' } as StopwatchModel;
    this._stopwatchService.propagateChange(model);
  }
}
