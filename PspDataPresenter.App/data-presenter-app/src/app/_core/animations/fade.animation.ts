
import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeAnimation =
    trigger('fadeAnimation', [

        state('void', style({ 'height': '0', 'opacity': '0', 'display': 'none' })),
        state('*', style({ 'height': '*', 'opacity': '*' })),

        transition('void => *', [
            style({ 'display': 'block' }),
            animate('.4s .4s ease-in-out')
        ]),

        transition('* => void', [
            animate('.4s ease-in-out')
        ])


    ]);