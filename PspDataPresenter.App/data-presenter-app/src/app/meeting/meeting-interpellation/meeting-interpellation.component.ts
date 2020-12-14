import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ngForItemAnimation } from '../../_core/animations/ng-for-item.animation';
import { MeetingDataStoreService } from '../../_core/dataStoreServices/meeting-data-store.service';
import { MeetingModel } from '../../_core/models/meeting.model';
import { InterpellationModel } from './../../_core/models/interpellation.model';

@Component({
  selector: 'app-meeting-interpellation',
  templateUrl: './meeting-interpellation.component.html',
  animations: [ngForItemAnimation]
})
export class MeetingInterpellationComponent implements OnInit {
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

  private _getMeeting() {
    this.meeting$ = this._meetingService.get().pipe(takeUntil(this._destroy$));
  }

  public shouldDisplayInterpellation(model: InterpellationModel) {
    return !model.finished;
  }

  public markItemFinished(model: InterpellationModel) {
    model.finished = true;
  }
  public trackByFn(index, item: InterpellationModel) {
    return item.id;
  }
}
