import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { VotingStartModel } from './../models/voting-start.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'votingStart' })
export class VotingStartStore extends Store<VotingStartModel> {
    constructor() {
        super({});
    }
}