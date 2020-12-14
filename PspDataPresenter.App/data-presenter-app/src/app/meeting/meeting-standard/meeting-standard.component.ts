import { ngForItemAnimation } from './../../_core/animations/ng-for-item.animation';
import { DebateModel } from './../../_core/models/debate.model';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MeetingDataStoreService } from '../../_core/dataStoreServices/meeting-data-store.service';
import { MeetingModel } from '../../_core/models/meeting.model';
import { FollowingItemModel } from '../../_core/models/following-item.model';

@Component({
  selector: 'app-meeting-standard',
  templateUrl: './meeting-standard.component.html',
  animations: [ngForItemAnimation]
})
export class MeetingStandardComponent implements OnInit {

  public meeting$: Observable<MeetingModel>;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _meetingService: MeetingDataStoreService
  ) { }

  ngOnInit() {
    this._getMeeting();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public hasDebatePriority(model: DebateModel) {
    return model.type === 'detailed';
  }

  private _getMeeting() {
    this.meeting$ = this._meetingService.get().pipe(takeUntil(this._destroy$));
  }

  public trackByFn(index, item: FollowingItemModel) {
    return item.id;
  }

  public trackByDebateIdfn(index, item: DebateModel) {
    return item.id;
  }

  public isGeneralDebate(model: DebateModel) {
    return (model.type === 'common' || model.type === 'general' || model.type === 'universal');
  }

  public isDetailedDebateType(model: DebateModel) {
    return model.type === 'detailed';
  }

  public getCountLeftForDetailedDebate(param1: DebateModel[]) {
    if (param1 == null || param1 === undefined || param1.length === 0) { return 0; }
    return 6 - (param1.filter(x => this.isGeneralDebate(x)).length);
  }
}
