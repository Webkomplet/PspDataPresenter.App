import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { NotificationModel } from '../models/notification.model';
import { VotingStartModel } from '../models/voting-start.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'notification' })
export class NotificationStore extends Store<NotificationModel> {
    constructor() {
        super({});
    }
}