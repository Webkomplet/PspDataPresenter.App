import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotingStartModel } from './../models/voting-start.model';
import { VotingStartQuery } from './../queries/voting-start.query';
import { VotingStartStore } from './../stores/voting-start.store';

@Injectable({ providedIn: 'root' })
export class VotingStartDataStoreService {

    constructor(
        private _votingStartStore: VotingStartStore,
        private _votingStartQuery: VotingStartQuery
    ) { }

    get(): Observable<VotingStartModel> {
        return this._votingStartQuery.select();
    }

    set(meeting: VotingStartModel) {
        this._votingStartStore.update(meeting);
    }

    update(meeting: Partial<VotingStartModel>) {
        this._votingStartStore.update(meeting);
    }

    remove() {
        this._votingStartStore.reset();
    }
}