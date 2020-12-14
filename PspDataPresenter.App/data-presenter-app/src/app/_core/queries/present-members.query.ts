import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { PresentMembersModel } from './../models/present-members.model';
import { PresentMembersStore } from './../stores/present-members.store';

@Injectable({ providedIn: 'root' })
export class PresentMembersQuery extends Query<PresentMembersModel> {

    constructor(protected store: PresentMembersStore) {
        super(store);
    }

}