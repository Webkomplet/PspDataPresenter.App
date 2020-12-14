import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotingResultModel } from '../models/voting-result.model';
import { VotingEndQuery } from '../queries/voting-end.query';
import { VotingEndStore } from '../stores/voting-end.store';

@Injectable({ providedIn: 'root' })
export class VotingEndDataStoreService {

    constructor(
        private _votingEndStore: VotingEndStore,
        private _votingEndQuery: VotingEndQuery
    ) { }

    get(): Observable<VotingResultModel> {
        return this._votingEndQuery.select();
    }

    set(meeting: VotingResultModel) {
        this._votingEndStore.update(meeting);
    }

    update(meeting: Partial<VotingResultModel>) {
        this._votingEndStore.update(meeting);
    }

    remove() {
        this._votingEndStore.reset();
    }
}