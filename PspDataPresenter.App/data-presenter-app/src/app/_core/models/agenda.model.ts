import { DebateModel } from "./debate.model";
import { InterpellationModel } from "./interpellation.model";

export interface AgendaModel {
    id: number;
    scheduleNo: number;
    name: string;
    type: string;
    state: string;
    abbreviation: string;
    description: string;
    print: string;
    debates: DebateModel[];
    interpellations: InterpellationModel[];
}