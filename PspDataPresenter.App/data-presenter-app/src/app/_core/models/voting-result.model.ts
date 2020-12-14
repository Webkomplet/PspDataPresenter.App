import { ClubModel } from "./club.model";
import { VotingSummaryModel } from "./voting-summary.model";

export interface VotingResultModel {
    votingClubResults: VotingClubResultModel[];
    summary: VotingSummaryModel;
}

export interface VotingClubResultModel
{
    clubModel: ClubModel;
    for: number;
    abstain: number;
    absent: number;
}