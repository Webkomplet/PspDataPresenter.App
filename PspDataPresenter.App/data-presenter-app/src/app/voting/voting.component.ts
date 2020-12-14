import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerComponent } from '../_core/components/timer/timer.component';
import { VotingStartDataStoreService } from '../_core/dataStoreServices/voting-start-data-store.service';
import { TimerState } from '../_core/enums/timer-state.enum';
import { VotingStartModel } from '../_core/models/voting-start.model';
import { MeetingDataStoreService } from './../_core/dataStoreServices/meeting-data-store.service';
import { NotificationDataStoreService } from './../_core/dataStoreServices/notification-data-store.service';
import { MeetingModel } from './../_core/models/meeting.model';
import { NotificationModel } from './../_core/models/notification.model';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html'
})
export class VotingComponent implements OnInit {


  private _destroy$: Subject<boolean> = new Subject<boolean>();

  public meeting$: Observable<MeetingModel>;
  public notification$: Observable<NotificationModel>;
  public votingStart$: Observable<VotingStartModel>;

  public startDate: Date;
  public endDate: Date;

  @ViewChild(TimerComponent, { static: false }) timer: TimerComponent;

  constructor(
    private _votingStartDataStoreService: VotingStartDataStoreService,
    private _meetingService: MeetingDataStoreService,
    private _notificationService: NotificationDataStoreService
  ) { }

  ngOnInit() {
    this._getMeeting();
    this._getNotification();
    this._getVotingStartInfo();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.timer?.getCurrentState() === TimerState.Running) {
      this.timer.endTimer();
    }

    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getVotingStartInfo() {
    this.votingStart$ = this._votingStartDataStoreService.get().pipe(takeUntil(this._destroy$));
    // this._votingStartDataStoreService.get().pipe(takeUntil(this._destroy$)).subscribe(x => {
    //   if (x.start && x.end && x.type === 'standard') {
    //     this.timer.startTimer();
    //   }
    // });
  }

  private _getMeeting() {
    this.meeting$ = this._meetingService.get().pipe(takeUntil(this._destroy$));
  }

  private _getNotification() {
    this.notification$ = this._notificationService.get().pipe(takeUntil(this._destroy$));
  }

  public processTimerStart() {
    setTimeout(x => {
      this.timer.startTimer();
    }, 1);
  }
}
