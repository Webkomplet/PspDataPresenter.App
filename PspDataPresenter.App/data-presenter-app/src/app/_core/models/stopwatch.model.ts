import { RoomModel } from './room.model';
export interface StopwatchModel {
    room: RoomModel;
    start: Date | string;
    end: Date | string;
    eventType: string;
    endMessageDisplayInterval: number;
    timestamp: Date | string;
}

export enum StopwatchEventType {
    Start,
    Stop
}