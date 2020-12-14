import { MemberModel } from "./member.model";

export interface DebateModel
{
    id: number;
    order: number;
    active: boolean;
    finished: boolean;
    type: string;
    timestamp: Date | string;
    member: MemberModel;
}