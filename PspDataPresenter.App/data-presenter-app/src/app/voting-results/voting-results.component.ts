import { NotificationDataStoreService } from './../_core/dataStoreServices/notification-data-store.service';
import { NotificationModel } from './../_core/models/notification.model';
import { VotingStartDataStoreService } from './../_core/dataStoreServices/voting-start-data-store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fadeOpacityAnimation } from '../_core/animations/fade-opacity.animation';
import { votingResultAnimation } from '../_core/animations/voting-result.animation';
import { MeetingDataStoreService } from '../_core/dataStoreServices/meeting-data-store.service';
import { MeetingModel } from '../_core/models/meeting.model';
import { VotingResultModel } from '../_core/models/voting-result.model';
import { VotingEndDataStoreService } from './../_core/dataStoreServices/voting-end-data-store.service';
import { VotingStartModel } from '../_core/models/voting-start.model';

@Component({
  selector: 'app-voting-results',
  templateUrl: './voting-results.component.html',
  animations: [fadeOpacityAnimation, votingResultAnimation]
})
export class VotingResultsComponent implements OnInit {

  public meeting$: Observable<MeetingModel>;
  public votingStart$: Observable<VotingStartModel>;
  public votingResult$: Observable<VotingResultModel>;
  public notification$: Observable<NotificationModel>;

  public resultHeaderAnimationState: number = 1;
  public animationRunning: boolean = false;
  public animationEnabled: boolean;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _meetingService: MeetingDataStoreService,
    private _votingStartDataStoreService: VotingStartDataStoreService,
    private _votingEndService: VotingEndDataStoreService,
    private _activatedRoute: ActivatedRoute,
    private _notificationService: NotificationDataStoreService
  ) { }

  ngOnInit() {
    this._setAnimationEnabled();
    this._getMeeting();
    this._getVotingStartInfo();
    this._getVotingResults();
    this._getNotification();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getMeeting() {
    this.meeting$ = this._meetingService.get().pipe(takeUntil(this._destroy$));
  }

  private _getVotingStartInfo() {
    this.votingStart$ = this._votingStartDataStoreService.get().pipe(takeUntil(this._destroy$));
  }

  private _getNotification() {
    this.notification$ = this._notificationService.get().pipe(takeUntil(this._destroy$));
  }

  private _getVotingResults() {
    this.votingResult$ = this._votingEndService.get().pipe(takeUntil(this._destroy$));
    this._votingEndService.get().subscribe(x => {
      if (this.animationRunning) { return; }
      if (!x.summary || !x.summary.result) { return; }
      if (!this.animationEnabled) {
        this.resultHeaderAnimationState = 3;
        return;
      }

      this._processAnimation();
    });
  }

  private _processAnimation() {
    this.animationRunning = true;
    this.resultHeaderAnimationState = 1;
    setTimeout(_x => {
      this.resultHeaderAnimationState = 2;
      setTimeout(_x => {
        this.resultHeaderAnimationState = 3;
        this.animationRunning = false;
      }, 1000);
    }, 2000);
  }

  private _setAnimationEnabled() {
    this.animationEnabled = (this._activatedRoute.snapshot.queryParams['animate'] == "true");
  }
}
