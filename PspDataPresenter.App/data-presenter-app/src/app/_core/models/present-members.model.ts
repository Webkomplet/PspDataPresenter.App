import { MemberModel } from "./member.model";
import { RoomModel } from "./room.model";

export class PresentMembersModel {
    room: RoomModel;
    members: MemberModel[];
    quorum: number;
}