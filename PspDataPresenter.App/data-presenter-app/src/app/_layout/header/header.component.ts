import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { headerTransition } from '../../_core/animations/header.animation';
import { MeetingDataStoreService } from '../../_core/dataStoreServices/meeting-data-store.service';
import { PresentMembersDataStoreService } from '../../_core/dataStoreServices/present-members-data-store.service';
import { MeetingModel } from '../../_core/models/meeting.model';
import { PresentMembersModel } from './../../_core/models/present-members.model';
import { DateSynchronizationService } from './../../_core/services/date-synchronization/date-synchronization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [headerTransition]
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() state: 'hidden' | 'normal' | 'normalWithoutStopwatch' | 'expanded' = 'hidden';

  public currentDate: Date;

  public meeting$: Observable<MeetingModel>;
  public presentMembers$: Observable<PresentMembersModel>;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _dateSynchronizationService: DateSynchronizationService,
    private _meetingService: MeetingDataStoreService,
    private _presentMembersDataStoreService: PresentMembersDataStoreService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._initializeTimeSynchronization();
    this._getMeeting();
    this._getPresentMembers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.state) {
      this.state = changes.state.currentValue;
      this._changeDetectorRef.markForCheck();
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  private _initializeTimeSynchronization() {
    this.currentDate = this._dateSynchronizationService.getCurrentDate();
    this._dateSynchronizationService.propagateUpdate
      .pipe(takeUntil(this._destroy$))
      .subscribe(x => {
        this.currentDate = new Date(
          x.getFullYear(),
          x.getMonth(),
          x.getDate(),
          x.getHours(),
          x.getMinutes(),
          x.getSeconds());
      });
  }

  private _getMeeting() {
    this.meeting$ = this._meetingService.get().pipe(takeUntil(this._destroy$));
  }

  private _getPresentMembers() {
    this.presentMembers$ = this._presentMembersDataStoreService.get().pipe(takeUntil(this._destroy$));
  }
}
