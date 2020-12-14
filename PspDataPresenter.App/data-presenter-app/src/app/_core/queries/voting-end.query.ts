import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { VotingResultModel } from '../models/voting-result.model';
import { VotingEndStore } from './../stores/voting-end.store';

@Injectable({ providedIn: 'root' })
export class VotingEndQuery extends Query<VotingResultModel> {

    constructor(protected store: VotingEndStore) {
        super(store);
    }

}