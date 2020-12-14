import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerState } from '../../enums/timer-state.enum';
import { DateSynchronizationService } from './../../services/date-synchronization/date-synchronization.service';

const FULL_DASH_ARRAY = 283;
const COLOR_CODES = {
  info: {
    color: "blue",
  },
  warning: {
    color: "orange",
    thresholdInPercents: 50
  },
  alert: {
    color: "red",
    thresholdInPercents: 25
  }
};

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() start: Date = null;
  @Input() end: Date = null;

  @Output() onTimerInit: EventEmitter<any> = new EventEmitter();
  @Output() onTimerStart: EventEmitter<any> = new EventEmitter();
  @Output() onTimerPause: EventEmitter<any> = new EventEmitter();
  @Output() onTimerResume: EventEmitter<any> = new EventEmitter();
  @Output() onTimerStateChange: EventEmitter<any> = new EventEmitter();
  @Output() onTimeLeftChange: EventEmitter<number> = new EventEmitter();
  @Output() onTimerEnd: EventEmitter<any> = new EventEmitter();

  private _state: TimerState = TimerState.Ended;
  private _timeLeft: number = 0;
  private _timeLimit: number = 0;
  private _timePassed: number = 0;

  private _currentDate: Date;
  private _timerInterval: Observable<number>;

  private timeIsUp$: Subject<boolean> = new Subject<boolean>();
  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  circleClass: string = null;

  constructor(
    private _dateSynchronizationService: DateSynchronizationService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this._initializeTimeSynchronization();
  }

  ngOnInit() {
    if (!this.start || !this.end) { return; }
    this._timeLimit = this._calculateLimit();
    this._timeLeft = this._calculateTimeLeft();
  }

  ngOnDestroy() {
    this.timeIsUp$.next();
    this.timeIsUp$.complete();
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.start) {
      this.start = changes.start.currentValue;
    }
    if (changes.end) {
      this.end = changes.end.currentValue;
    }

    if (!this.start || !this.end) { return; }

    this._timeLimit = this._calculateLimit();
    this._timeLeft = this._calculateTimeLeft();
  }

  ngAfterViewInit() {
    this.onTimerInit.emit();
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

  /**
   *
   *
   * @memberof TimerComponent
   */
  public getCurrentState(): TimerState {
    return this._state;
  }

  /**
 *
 *
 * @memberof TimerComponent
 */
  public getTimeLeft(): number {
    return this._timeLeft;
  }

  /**
   *
   *
   * @memberof TimerComponent
   */
  public startTimer(): void {
    if (this.getCurrentState() === TimerState.Running) {
      return;
    }
    this.onTimerStart.emit();
    this._setState(TimerState.Running);
    this._startTimerCountdown();
  }

  /**
   *
   *
   * @memberof TimerComponent
   */
  public pauseTimer(): void {

    if (this.getCurrentState() !== TimerState.Running) {
      return;
    }

    this.onTimerPause.emit();
    this._setState(TimerState.Paused);
    this._pauseTimerCountdown();
  }

  /**
   *
   *
   * @memberof TimerComponent
   */
  public resumeTimer(): void {

    if (this.getCurrentState() !== TimerState.Paused) {
      return;
    }

    this.onTimerResume.emit();
    this._setState(TimerState.Running);
    this._resumeTimerCountdown();
  }

  /**
   *
   *
   * @memberof TimerComponent
   */
  public endTimer(): void {
    if (this.getCurrentState() === TimerState.Ended) {
      return;
    }
    this.onTimerEnd.emit();
    this._setState(TimerState.Ended);
    this._endTimerCountdown();
  }

  private _setState(newState: TimerState) {
    this._state = newState;
    this.onTimerStateChange.emit();
  }

  private _startTimerCountdown() {
    console.debug('Timer start');
    this._timePassed = 0;
    this._timeLimit = this._calculateLimit();
    this._timeLeft = this._calculateTimeLeft();
    this.timeIsUp$ = new Subject<boolean>();
    this._startTimerInterval();
  }

  private _pauseTimerCountdown() {
    console.debug('Timer paused');
    this.timeIsUp$.next();
    this.timeIsUp$.complete();
  }

  private _resumeTimerCountdown() {
    console.debug('Timer resume');
    this.timeIsUp$ = new Subject<boolean>();
    this._startTimerInterval();
  }

  private _endTimerCountdown() {
    console.debug('Timer end');
    this.timeIsUp$.next();
    this.timeIsUp$.complete();
    this._timeLeft = 0;
    this._timeLimit = 0;
    this._updateTimerCircle();
  }

  private _calculateLimit() {
    if (!this.start || !this.end) {
      return 0;
    }

    if (this.end < this.start) {
      console.log("End date could not be smaller than start date!");
      return 0;
    }

    if (this.end < this._currentDate) {
      console.log("Timer already expired");
      return 0;
    }

    let start = new Date(this.start);
    let end = new Date(this.end);

    if (this.start < this._currentDate) {
      start = this._currentDate;
    }

    const difference = end.getTime() - start.getTime();
    return difference / 1000;
  }

  private _startTimerInterval() {
    this._updateTimerCircle();

    if (this._timeLeft <= 0) {
      return;
    }

    this._timerInterval = interval(1000);
    this._timerInterval.pipe(takeUntil(this.timeIsUp$))
      .subscribe(
        () => {
          this._timePassed += 1;
          this._timeLeft = this._calculateTimeLeft();

          this.onTimeLeftChange.emit(this._timeLeft);

          this._updateTimerCircle();

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

  private _updateTimerCircle() {
    document.getElementById("base-timer-label").innerHTML = this._formatTime(this._timeLeft);
    this._setCircleDasharray();
    this._setRemainingPathColor();
  }

  private _formatTime(time) {
    let seconds = time % 60;
    return `${seconds}`;
  }

  private _setRemainingPathColor() {
    const { alert, warning, info } = COLOR_CODES;
    let thresholdInPercents = this._timeLeft / (this._timeLimit / 100) ?? 0;

    if (!thresholdInPercents)
      thresholdInPercents = 0;

    if (thresholdInPercents <= alert.thresholdInPercents) {
      this.circleClass = alert.color;
    } else if (thresholdInPercents <= warning.thresholdInPercents) {
      this.circleClass = warning.color;
    } else {
      this.circleClass = info.color;
    }

    this._changeDetectorRef.detectChanges();
  }

  private _calculateTimeFraction() {
    const rawTimeFraction = this._timeLeft / this._timeLimit;
    return rawTimeFraction - (1 / this._timeLimit) * (1 - rawTimeFraction);
  }

  private _setCircleDasharray() {
    const circleDasharray = `${(
      this._calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
}
