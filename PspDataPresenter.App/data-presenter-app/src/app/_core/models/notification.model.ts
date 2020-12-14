import { NotificationCancelType } from "../enums/notification-cancel-type.enum";
import { NotificationStartType } from "../enums/notification-start-type.enum";
import { NotificationType } from "../enums/notification-type.enum";
import { RoomModel } from "./room.model";

export interface NotificationModel {
    id: number;
    created: Date | string;
    started: Date | string;
    ended: Date | string | null;
    type: NotificationType;
    meeting1Number: number;
    meeting2Number: number | null;
    meeting1Time1: Date | string | null;
    meeting1Time2: Date | string | null;
    meeting2Time: Date | string | null;
    startType: NotificationStartType;
    cancelType: NotificationCancelType;
    text: string;
    room: RoomModel;
    timestamp: Date | string;
}