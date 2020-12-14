import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PresentMembersModel } from './../models/present-members.model';
import { PresentMembersQuery } from './../queries/present-members.query';
import { PresentMembersStore } from './../stores/present-members.store';

@Injectable({ providedIn: 'root' })
export class PresentMembersDataStoreService {

    constructor(
        private _presentMembersStore: PresentMembersStore,
        private _presentMembersQuery: PresentMembersQuery
    ) { }

    get(): Observable<PresentMembersModel> {
        return this._presentMembersQuery.select();
    }

    set(meeting: PresentMembersModel) {
        this._presentMembersStore.update(meeting);
    }

    update(meeting: Partial<PresentMembersModel>) {
        this._presentMembersStore.update(meeting);
    }

    remove() {
        this._presentMembersStore.reset();
    }
}