import { AgendaModel } from "./agenda.model";
import { BoardModel } from "./board.model";
import { CurrentAgendaItem } from "./current-agenda-item.model";
import { FollowingItemModel } from "./following-item.model";
import { MajorityModel } from "./majority.model";
import { RemarkModel } from "./remark.model";
import { RoomModel } from "./room.model";

export interface MeetingModel
{
    id: number;
    meetingNo: number;
    canRemotelySignUpForDebate: boolean;
    board: BoardModel;
    room: RoomModel;
    currentAgendaItem: CurrentAgendaItem;
    majority: MajorityModel;
    agenda: AgendaModel[];
    remarks: RemarkModel[];
    followingItems: FollowingItemModel[];
    timestamp: Date | string;
}