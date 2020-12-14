import { MemberVoteModel } from "./member-vote.model";
import { RoomModel } from "./room.model";
import { VotingSummaryModel } from "./voting-summary.model";

export interface VotingEndModel
{
    id: number;
    room: RoomModel;
    votingNo: number;
    start: Date | string;
    end: Date | string;   
    votingSummary: VotingSummaryModel;
    memberVotes: MemberVoteModel[];
    timestamp: Date | string;
}