import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MeetingModel } from './../models/meeting.model';
import { MeetingStore } from './../stores/meeting.store';

@Injectable({ providedIn: 'root' })
export class MeetingQuery extends Query<MeetingModel> {

    constructor(protected store: MeetingStore) {
        super(store);
    }

}