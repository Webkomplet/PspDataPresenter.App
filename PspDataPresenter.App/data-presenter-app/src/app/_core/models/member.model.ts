import { ClubModel } from "./club.model";

export interface MemberModel
{
    id: number;
    firstName: string;
    lastName: string;
    shortName: string;
    card: string;
    club: ClubModel;
}