import { AgendaModel } from "./agenda.model";

export interface FollowingItemModel
{
    id: number;
    order: number;
    item: AgendaModel;
}