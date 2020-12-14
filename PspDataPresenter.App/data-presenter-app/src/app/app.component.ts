import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChildActivationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { routerTransition } from './_core/animations/router-transition.animation';
import { SignalrService } from './_core/services/signalr/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [routerTransition]
})
export class AppComponent implements OnInit, OnDestroy {

  public headerState: 'hidden' | 'normal' | 'normalWithoutStopwatch' | 'expanded' = 'hidden';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _titleService: Title,
    private _signalrService: SignalrService,
    private _router: Router) {
    this._titleService.setTitle('Výsledková tabule poslanecké sněmovny');
  }

  ngOnInit() {
    this._signalrService.connect();
    this._subscribeToSignalrConnection();
    this._subscribeToRouteChanges();
  }

  ngOnDestroy() {
    this._signalrService.disconnect();
    this.destroy$.next();
    this.destroy$.complete();
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  private _subscribeToSignalrConnection() {
    this._signalrService.onConnected.subscribe(() => {
      this._signalrService.initializeApplicationData().subscribe(() => {
         // Some logic could be done here after initial cached data were fetched
      })
    });
  }

  private _subscribeToRouteChanges() {
    this._router.events.pipe(takeUntil(this.destroy$)).subscribe((event: any) => {
      if (event instanceof ChildActivationStart) {
        let headerState = event.snapshot?.data?.headerStyle;
        this.headerState = headerState;
      }
    })
  }
}
