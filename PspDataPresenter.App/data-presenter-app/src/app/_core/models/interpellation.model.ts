import { MemberModel } from "./member.model";

export interface InterpellationModel
{
    id: number;
    order: number;
    subject: string;
    toPrimeMinister: boolean;
    active: boolean;
    finished: boolean;
    timestamp: Date | string;
    submitter: MemberModel;
    interpellatedMember: MemberModel;
}