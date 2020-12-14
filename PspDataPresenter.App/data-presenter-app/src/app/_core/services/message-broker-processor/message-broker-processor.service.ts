import { VotingReviewModel } from './../../models/voting-review.model';
import { StopwatchService } from './../stopwatch/stopwatch.service';
import { VotingEndDataStoreService } from './../../dataStoreServices/voting-end-data-store.service';
import { VotingStartDataStoreService } from './../../dataStoreServices/voting-start-data-store.service';
import { PresentMembersDataStoreService } from './../../dataStoreServices/present-members-data-store.service';
import { PresentMembersModel } from './../../models/present-members.model';
import { MeetingModel } from './../../models/meeting.model';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MeetingDataStoreService } from '../../dataStoreServices/meeting-data-store.service';
import { StopwatchModel } from '../../models/stopwatch.model';
import { DateSynchronizationService } from '../date-synchronization/date-synchronization.service';
import { VotingEndModel } from './../../models/voting-end.model';
import { VotingStartModel } from './../../models/voting-start.model';
import { NotificationModel } from '../../models/notification.model';
import { NotificationDataStoreService } from '../../dataStoreServices/notification-data-store.service';
import { SystemTimeModel } from '../../models/system-time.model';
import { VotingResultModel } from '../../models/voting-result.model';
import { ClearVotingResultModel } from '../../models/voting-result-clear.model';
import { take } from 'rxjs/operators';

@Injectable()
export class MessageBrokerProcessorService {

    constructor(
        private _router: Router,
        private _dateSynchronizationService: DateSynchronizationService,
        private _countdownService: StopwatchService,

        // Stores
        private _meetingDataStoreService: MeetingDataStoreService,
        private _presentMembersDataStoreService: PresentMembersDataStoreService,
        private _votingStartDataStoreService: VotingStartDataStoreService,
        private _votingEndDataStoreService: VotingEndDataStoreService,
        private _notificationDataStoreService: NotificationDataStoreService
    ) {
        console.debug('MessageBrokerProcessorService initialized.');
    }

    processMeeting(data: MeetingModel) {
        if (data == null) { return; }
        this._meetingDataStoreService.set(data);
        this._notificationDataStoreService.get().pipe(take(1)).subscribe(
            x => {
                if (x.hasOwnProperty('cancelType') && x.cancelType === null) {
                    this._router.navigate(['/notification']);
                } else {
                    if (!data.currentAgendaItem || !data.currentAgendaItem.type) { return; }
                    this._navigateToMeetingByType(data.currentAgendaItem.type);
                }
            }
        )
    }

    processPresentMembers(data: PresentMembersModel) {
        if (data == null) { return; }
        this._presentMembersDataStoreService.set(data);
    }

    processStopwatch(data: StopwatchModel) {
        if (data == null) { return; }
        this._countdownService.propagateChange(data);
    }

    processDateSynchronization(data: SystemTimeModel) {
        if (data == null) { return; }
        this._dateSynchronizationService.synchronize(data.timestamp);
    }

    processVotingStart(data: VotingStartModel) {
        if (data == null) { return; }
        this._votingStartDataStoreService.set(data);
        this._router.navigate(['/voting'])
    }

    processVotingEnd(data: VotingResultModel) {
        if (data == null) { return; }
        this._votingEndDataStoreService.set(data);
        this._router.navigate(['/votingResults'], { queryParams: { 'animate': 'true' } } as NavigationExtras);
    }

    processVotingReview(data: VotingReviewModel) {
        if (data == null) { return; }
        this._votingEndDataStoreService.set(data as VotingResultModel);
        this._router.navigate(['/votingResults'], { queryParams: { 'animate': 'false' } } as NavigationExtras);
    }

    processClearVotingResult(data: ClearVotingResultModel) {
        if (data == null) { return; }

        this._notificationDataStoreService.get().pipe(take(1)).subscribe(
            x => {
                console.log('Last stored notification', x);
                if (x.hasOwnProperty('cancelType') && x.cancelType === null) {
                    this._router.navigate(['/notification']);
                } else {
                    this._router.navigate(['/meeting']);
                }
            }
        )
    }

    processNotification(data: NotificationModel) {
        if (data == null) { return; }
        this._notificationDataStoreService.set(data);
        if (data.cancelType) {
            this._meetingDataStoreService.get().pipe(take(1))
                .subscribe(x => {
                    if (!x.currentAgendaItem || !x.currentAgendaItem.type) {
                        return;
                    } else {
                        this._navigateToMeetingByType(x.currentAgendaItem.type);
                    }
                });
        } else {
            this._router.navigate(['/notification']);
        }
    }

    private _navigateToMeetingByType(type: string) {
        if (type === 'standard') {
            this._router.navigate(['/meeting/standard']);
        } else if (type === 'interpellation') {
            this._router.navigate(['/meeting/interpellation']);
        }
    }
}
