
import { animate, state, style, transition, trigger } from '@angular/animations';

export const countdownAnimation =
    trigger('countdownAnimation', [
        state('false', style({
            height: '0px',
            opacity: '0',
            overflow: 'hidden'
        })),
        state('true', style({
            height: '*',
            opacity: '1'
        })),
        transition('false => true', animate('200ms ease-in')),
        transition('true => false', animate('200ms ease-out'))
    ]);