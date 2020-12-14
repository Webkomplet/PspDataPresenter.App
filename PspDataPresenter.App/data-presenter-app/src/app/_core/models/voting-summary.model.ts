export interface VotingSummaryModel {
    present: number;
    absent: number;
    quorum: number;
    votedFor: number;
    votedAgainst: number;
    abstained: number;
    // passed, failed, noQuorum
    result: string;
}