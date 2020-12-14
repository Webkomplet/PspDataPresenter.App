import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { VotingResultModel } from '../models/voting-result.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'votingEnd' })
export class VotingEndStore extends Store<VotingResultModel> {
    constructor() {
        super({});
    }
}