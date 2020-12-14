import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { NotificationModel } from './../models/notification.model';
import { NotificationStore } from './../stores/notification.store';

@Injectable({ providedIn: 'root' })
export class NotificationQuery extends Query<NotificationModel> {

    constructor(protected store: NotificationStore) {
        super(store);
    }

}