import { FollowingItemModel } from './../_core/models/following-item.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MeetingDataStoreService } from '../_core/dataStoreServices/meeting-data-store.service';
import { MeetingModel } from '../_core/models/meeting.model';
import { routerTransition } from '../_core/animations/router-transition.animation';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  animations: [routerTransition]
})
export class MeetingComponent implements OnInit {

  public test: string = '';

  public meeting$: Observable<MeetingModel>;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _meetingService: MeetingDataStoreService,
    private _router: Router
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
    this._meetingService.get().pipe(takeUntil(this._destroy$)).subscribe(x => {
      if (x.currentAgendaItem?.type === 'standard') {
        this._router.navigate(['/meeting/standard']);
      } else if (x.currentAgendaItem?.type === 'interpellation') {
        this._router.navigate(['/meeting/interpellation']);
      }
    });
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
