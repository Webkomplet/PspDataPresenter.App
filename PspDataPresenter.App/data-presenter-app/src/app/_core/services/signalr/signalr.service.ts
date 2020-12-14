import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { from, Observable } from 'rxjs';
import { NotificationModel } from '../../models/notification.model';
import { ClearVotingResultModel } from '../../models/voting-result-clear.model';
import { VotingResultModel } from '../../models/voting-result.model';
import { MessageBrokerProcessorService } from '../message-broker-processor/message-broker-processor.service';
import { MeetingModel } from './../../models/meeting.model';
import { PresentMembersModel } from './../../models/present-members.model';
import { StopwatchModel } from './../../models/stopwatch.model';
import { SystemTimeModel } from './../../models/system-time.model';
import { VotingStartModel } from './../../models/voting-start.model';

@Injectable({
    providedIn: 'root'
})
export class SignalrService {

    public onConnected: EventEmitter<any> = new EventEmitter();

    private hubConnection: HubConnection;
    
    constructor(
        private messageBrokerProcessor: MessageBrokerProcessorService,
        @Inject(DOCUMENT) private document: Document
    ) {     
        

    }

    public connect = () => {
        this.startConnection();
        this.addListeners();
    }

    public disconnect = () => {
        if (this.hubConnection.state === HubConnectionState.Connected) {
            this.hubConnection.stop();
        }
    }

    public initializeApplicationData(): Observable<void> {
        var promise = this.hubConnection.invoke("AppInit")
            .then(() => { console.log('Successfully requested application initialization data.'); })
            .catch((err) => console.log('Unable to request application initialization data', err));

        return from(promise);
    }

    private getConnection(): HubConnection {
        let connectionUrl = document.location.protocol +'//'+ document.location.hostname +':'+ document.location.port + '/signalr'        
        return new HubConnectionBuilder()
            .withUrl(connectionUrl)
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();
    }

    private startConnection() {
        this.hubConnection = this.getConnection();
        this.hubConnection.start()
            .then(() => {
                console.log('Connected to SignalR');
                this.onConnected.emit();
            })
            .catch((err) => console.log('Error while establishing signalr connection: ' + err))
    }

    private addListeners() {
        this.hubConnection.on("systemTime",
            (data: SystemTimeModel) => {
                this.messageBrokerProcessor.processDateSynchronization(data);
            })
        this.hubConnection.on("meeting",
            (data: MeetingModel) => {
                this.messageBrokerProcessor.processMeeting(data);
            })
        this.hubConnection.on("presentMembers",
            (data: PresentMembersModel) => {
                this.messageBrokerProcessor.processPresentMembers(data);
            })
        this.hubConnection.on("votingStart",
            (data: VotingStartModel) => {
                this.messageBrokerProcessor.processVotingStart(data);
            })
        this.hubConnection.on("votingReview",
            (data: VotingResultModel) => {
                this.messageBrokerProcessor.processVotingReview(data);
            })
        this.hubConnection.on("clearVotingResult",
            (data: ClearVotingResultModel) => {
                this.messageBrokerProcessor.processClearVotingResult(data);
            })
        this.hubConnection.on("votingEnd",
            (data: VotingResultModel) => {
                this.messageBrokerProcessor.processVotingEnd(data);
            })
        this.hubConnection.on("stopwatch",
            (data: StopwatchModel) => {
                this.messageBrokerProcessor.processStopwatch(data);
            })
        this.hubConnection.on("notification",
            (data: NotificationModel) => {
                this.messageBrokerProcessor.processNotification(data);
            })
    }
}
