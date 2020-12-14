import { animate, state, style, transition, trigger } from "@angular/animations";

export const headerTransition = trigger('headerTransition', [
    state('*', style({ 'opacity': '0', 'height': 0 })),
    state('void', style({ 'opacity': '0', 'height': 0 })),
    state('hidden', style({ 'opacity': '0', 'height': 0 })),
    state('expanded', style({ 'opacity': '1' })),
    state('normal', style({ 'opacity': '1' })),
    state('normalWithoutStopwatch', style({ 'opacity': '1' })),
    transition('* <=> *', animate('.8s')),
    transition('normal <=> expanded', animate('.8s', style({ opacity: 0 }))),
    transition('normalWithoutStopwatch <=> expanded', animate('.8s', style({ opacity: 0 })))
])
