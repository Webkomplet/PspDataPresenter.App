import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomEventEmitter } from './../../helpers/custom-event-emitter';

@Injectable({ providedIn: 'root' })
export class DateSynchronizationService implements OnDestroy {

    public propagateUpdate: CustomEventEmitter<Date>;

    private _currentDate;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor() {
        console.debug("DateSynchronizationService initialized.");

        this.propagateUpdate = new CustomEventEmitter<Date>();

        this._setCurrentDate(new Date());
        this._propagateChange();
        this._startCurrentDateUpdater();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public getCurrentDate() {
        return this._currentDate;
    }

    public synchronize(currentServerTimestampString: string): void {       
        var serverTimestamp = Date.parse(new Date(Date.parse(currentServerTimestampString)).toUTCString());
        var nowTimeStamp = Date.parse(new Date().toUTCString());
        var serverClientResponseDiffTime = nowTimeStamp - serverTimestamp;        
        var newSynchronizedDate = new Date();
        newSynchronizedDate.setTime(newSynchronizedDate.getTime() - serverClientResponseDiffTime);
        this._setCurrentDate(newSynchronizedDate);
    }

    private _setCurrentDate(newDate: Date) {
        this._currentDate = newDate;
        this.propagateUpdate.emit(this._currentDate);
    }

    private _startCurrentDateUpdater() {
        const timeUpdater = interval(1000);
        timeUpdater.pipe(takeUntil(this.destroy$)).subscribe(n => {
            this._addSecond();
            this._propagateChange();
        });
    }

    private _propagateChange() {
        this.propagateUpdate.emit(this._currentDate);
    }

    private _addSecond() {
        this._currentDate.setSeconds(this._currentDate.getSeconds() + 1);
    }
}
