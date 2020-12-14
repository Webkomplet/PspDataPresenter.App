import { MemberModel } from "./member.model";

export interface RemarkModel
{
    id: number;
    order: number;
    timestamp: Date | string;
    member: MemberModel;
}