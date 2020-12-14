import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationModel } from './../models/notification.model';
import { NotificationQuery } from './../queries/notification.query';
import { NotificationStore } from './../stores/notification.store';

@Injectable({ providedIn: 'root' })
export class NotificationDataStoreService {

    constructor(
        private _notificationStore: NotificationStore,
        private _notificationQuery: NotificationQuery
    ) { }

    get(): Observable<NotificationModel> {
        return this._notificationQuery.select();
    }

    set(notification: NotificationModel) {
        this._notificationStore.update(notification);
    }

    update(meeting: Partial<NotificationModel>) {
        this._notificationStore.update(meeting);
    }

    remove() {
        this._notificationStore.reset();
    }
}