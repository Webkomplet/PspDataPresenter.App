
import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeOpacityAnimation =
    trigger('fadeOpacityAnimation', [
        state('void', style({ opacity: 0 })),
        state('*', style({ opacity: 1 })),
        transition(':enter', animate('800ms ease-out')),
        transition(':leave', animate('800ms ease-in')),
    ]);