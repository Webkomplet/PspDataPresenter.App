import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { PresentMembersModel } from './../models/present-members.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'presentMembers' })
export class PresentMembersStore extends Store<PresentMembersModel> {
    constructor() {
        super({});
    }
}