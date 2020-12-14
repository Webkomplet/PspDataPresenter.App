import { RoomModel } from "./room.model";

export interface VotingStartModel {
    id: number;
    room: RoomModel;
    votingNo: number;
    type: string;
    start: Date | string;
    end: Date | string;
    timestamp: Date | string;
}