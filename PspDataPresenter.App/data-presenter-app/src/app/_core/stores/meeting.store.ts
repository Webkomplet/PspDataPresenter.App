import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { MeetingModel } from './../models/meeting.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'meeting' })
export class MeetingStore extends Store<MeetingModel> {
    constructor() {
        super({});
    }
}