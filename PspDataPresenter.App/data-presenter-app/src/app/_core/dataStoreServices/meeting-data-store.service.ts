import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MeetingModel } from './../models/meeting.model';
import { MeetingQuery } from './../queries/meeting.query';
import { MeetingStore } from './../stores/meeting.store';

@Injectable({ providedIn: 'root' })
export class MeetingDataStoreService {

    constructor(
        private meetingsStore: MeetingStore,
        private meetingsQuery: MeetingQuery
    ) { }

    get(): Observable<MeetingModel> {
        return this.meetingsQuery.select();
    }

    set(meeting: MeetingModel) {
        this.meetingsStore.update(meeting);
    }

    update(meeting: Partial<MeetingModel>) {
        this.meetingsStore.update(meeting);
    }

    remove() {
        this.meetingsStore.reset();
    }
}