import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fadeAnimation } from '../_core/animations/fade.animation';
import { NotificationDataStoreService } from './../_core/dataStoreServices/notification-data-store.service';
import { NotificationModel } from './../_core/models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  animations: [fadeAnimation]
})
export class NotificationComponent implements OnInit {

  public notification$: Observable<NotificationModel>;
  public textHeight: number;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('notificationText', { static: false }) notificationTextElem: ElementRef;

  constructor(
    private _notificationService: NotificationDataStoreService,
    private _ngZone: NgZone
  ) { }

  ngOnInit() {
    this._getNotification();
    this._subscribeForHeight();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _subscribeForHeight() {
    this._ngZone.onStable.pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.textHeight = this.notificationTextElem?.nativeElement.offsetHeight;
      })
  }

  private _getNotification() {
    this.notification$ = this._notificationService.get().pipe(takeUntil(this._destroy$));
  }
}
