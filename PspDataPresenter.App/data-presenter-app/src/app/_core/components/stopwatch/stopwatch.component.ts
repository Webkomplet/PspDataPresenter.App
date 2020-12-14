import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { countdownAnimation } from '../../animations/countdown.animation';
import { StopwatchState } from '../../enums/stopwatch-state.enum';
import { StopwatchModel } from '../../models/stopwatch.model';
import { DateSynchronizationService } from '../../services/date-synchronization/date-synchronization.service';
import { StopwatchService } from '../../services/stopwatch/stopwatch.service';


@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  animations: [countdownAnimation]
})
export class StopwatchComponent implements OnInit, OnDestroy {

  @Output() onStopwatchStart: EventEmitter<any> = new EventEmitter();
  @Output() onStopwatchPause: EventEmitter<any> = new EventEmitter();
  @Output() onStopwatchResume: EventEmitter<any> = new EventEmitter();
  @Output() onStopwatchStateChange: EventEmitter<any> = new EventEmitter();
  @Output() onStopwatchTimeLeftChange: EventEmitter<number> = new EventEmitter();
  @Output() onStopwatchEnd: EventEmitter<any> = new EventEmitter();

  public timeLeftStringed: string | null = null;
  public countdownVisible: boolean = false;

  private _currentDate: Date;
  private _currentStopwatchData: StopwatchModel;

  private _state: StopwatchState = StopwatchState.Ended;
  private _timeLeft: number = 0;
  private _timeLimit: number = 0;
  private _timePassed: number = 0;

  private _countdownInterval: Observable<number>;

  private timeIsUp$: Subject<boolean> = new Subject<boolean>();
  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _dateSynchronizationService: DateSynchronizationService,
    private _countdownService: StopwatchService
  ) {
    this._initializeTimeSynchronization();
    this._subscribeForStopwatchService();
  }

  private _initializeTimeSynchronization() {
    this._currentDate = this._dateSynchronizationService.getCurrentDate();
    this._dateSynchronizationService.propagateUpdate
      .pipe(takeUntil(this._destroyed$))
      .subscribe(x => {
        this._currentDate = new Date(
          x.getFullYear(),
          x.getMonth(),
          x.getDate(),
          x.getHours(),
          x.getMinutes(),
          x.getSeconds());
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.timeIsUp$.next();
    this.timeIsUp$.complete();
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  /**
   *
   *
   * @memberof StopwatchComponent
   */
  public getCurrentState(): StopwatchState {
    return this._state;
  }

  /**
 *
 *
 * @memberof StopwatchComponent
 */
  public getTimeLeft(): number {
    return this._timeLeft;
  }

  /**
   *
   *
   * @memberof StopwatchComponent
   */
  public startTimer(): void {
    if (this.getCurrentState() === StopwatchState.Running) {
      return;
    }

    this.onStopwatchStart.emit();
    this._setState(StopwatchState.Running);
    this._startTimerStopwatch();
  }

  /**
   *
   *
   * @memberof StopwatchComponent
   */
  public pauseTimer(): void {

    if (this.getCurrentState() !== StopwatchState.Running) {
      return;
    }

    this.onStopwatchPause.emit();
    this._setState(StopwatchState.Paused);
    this._pauseTimerStopwatch();
  }

  /**
   *
   *
   * @memberof StopwatchComponent
   */
  public resumeTimer(): void {

    if (this.getCurrentState() !== StopwatchState.Paused) {
      return;
    }

    this.onStopwatchResume.emit();
    this._setState(StopwatchState.Running);
    this._resumeTimerStopwatch();
  }

  /**
   *
   *
   * @memberof StopwatchComponent
   */
  public endTimer(): void {
    if (this.getCurrentState() === StopwatchState.Ended) {
      return;
    }
    this.onStopwatchEnd.emit();
    this._setState(StopwatchState.Ended);
    this._endTimerStopwatch();
  }

  private _setState(newState: StopwatchState) {
    this._state = newState;
    this.onStopwatchStateChange.emit();
  }

  private async _subscribeForStopwatchService() {
    this._countdownService.events.pipe(takeUntil(this._destroyed$))
      .subscribe(
        (x) => {

          if (this.getCurrentState() == StopwatchState.Paused && x.eventType === 'start') {
            this.resumeTimer();
          }

          if (x.eventType === 'start') {
            this._currentStopwatchData = x;
            this.startTimer();
            return;
          }

          if (x.eventType === 'pause') {
            this.pauseTimer();
            return;
          }

          if (x.eventType === 'stop') {
            this._currentStopwatchData = x;
            this.endTimer();
            return;
          }
        }
      );
  }

  private _startTimerStopwatch() {
    this._timePassed = 0;
    this._timeLimit = this._calculateLimit();

    if (this._timeLimit <= 0) {
      return;
    }

    this._timeLeft = this._calculateTimeLeft();
    this.timeIsUp$ = new Subject<boolean>();
    this.countdownVisible = true;
    this._startTimerInterval();
  }

  private _pauseTimerStopwatch() {
    this.timeIsUp$.next();
    this.timeIsUp$.complete();
  }

  private _resumeTimerStopwatch() {
    this.timeIsUp$ = new Subject<boolean>();
    this._startTimerInterval();
  }

  private _endTimerStopwatch() {
    this.timeIsUp$.next();
    this.timeIsUp$.complete();
    this._timeLeft = 0;
    this._timeLimit = 0;
    this._updateTimeLeftString();

    // To keep stowatch visible even if time is 0:00 for 800ms
    setTimeout(() => {
      this.countdownVisible = false;
    }, this._currentStopwatchData.endMessageDisplayInterval);
  }

  private _calculateLimit() {
    if (!this._currentStopwatchData.start || !this._currentStopwatchData.end) {
      return 0;
    }

    let start = new Date(this._currentStopwatchData.start);
    let end = new Date(this._currentStopwatchData.end);

    const difference = end.getTime() - start.getTime();
    return difference / 1000;
  }

  private _startTimerInterval() {
    if (this._timeLeft <= 0) {
      return;
    }

    this._updateTimeLeftString();
    this._countdownInterval = interval(1000);
    this._countdownInterval.pipe(takeUntil(this.timeIsUp$))
      .subscribe(
        () => {
          this._timePassed += 1;
          this._timeLeft = this._calculateTimeLeft();

          this.onStopwatchTimeLeftChange.emit(this._timeLeft);

          this._updateTimeLeftString();

          if (this._timeLeft <= 0) {
            this.onTimesUp();
          }
        }
      )
  }

  private _calculateTimeLeft() {
    return this._timeLimit - this._timePassed;
  }

  private onTimesUp() {
    this.endTimer();
  }

  private _updateTimeLeftString() {
    this.timeLeftStringed = this._formatTime(this._timeLeft);
  }

  private _formatTime(timeInSeconds: number) {
    var m = Math.floor(timeInSeconds % 3600 / 60).toString(),
      s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');

    return m + ':' + s;
  }
}
