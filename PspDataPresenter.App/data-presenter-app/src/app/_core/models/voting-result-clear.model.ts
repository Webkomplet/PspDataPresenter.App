import { RoomModel } from './room.model';
export interface ClearVotingResultModel {
    room: RoomModel;
    clearType: string;
    timestamp: Date;
}