import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { VotingStartModel } from './../models/voting-start.model';
import { VotingStartStore } from './../stores/voting-start.store';

@Injectable({ providedIn: 'root' })
export class VotingStartQuery extends Query<VotingStartModel> {

    constructor(protected store: VotingStartStore) {
        super(store);
    }

}