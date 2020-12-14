import { Injectable } from '@angular/core';
import { CustomEventEmitter } from '../../helpers/custom-event-emitter';
import { StopwatchModel } from '../../models/stopwatch.model';

@Injectable({ providedIn: 'root' })
export class StopwatchService {

    public events: CustomEventEmitter<StopwatchModel>;

    constructor() {
        this.events = new CustomEventEmitter<StopwatchModel>();
    }

    public propagateChange(event: StopwatchModel) {
        this.events.emit(event);
    }

    public getValue(): StopwatchModel {
        return this.events.value;
    }
}
