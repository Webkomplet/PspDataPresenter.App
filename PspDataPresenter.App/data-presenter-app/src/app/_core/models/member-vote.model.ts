import { MemberModel } from "./member.model";

export interface MemberVoteModel {
    vote: string;
    member: MemberModel;
}