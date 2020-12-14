import { animate, state, style, transition, trigger } from '@angular/animations';

export const votingResultAnimation = trigger('resultHeaderAnimation', [
    state('1', style({
        'margin-top': '120px',
        'max-width': '*',
        'padding': '40px',
        'justify-content': 'flex-start',
        'text-align': 'center'
    })),
    state('2', style({
        'margin-top': '*',
        'max-width': '100%',
        'padding': '10px',  
        'justify-content': 'space-between',
        'text-align': 'left'
    })),
    state('3', style({
        'margin-top': '*',
        'padding': '10px',
        'max-width': '100%',
        'justify-content': 'space-between',
        'text-align': 'left'
    })),
    transition('1 => 2', animate('900ms ease-in')),
    transition('2 => 3', animate('900ms ease-in'))
])