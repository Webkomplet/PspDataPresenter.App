import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [
        query(':enter', style({ position: 'absolute', width: '100%' }), { optional: true }),
        query(':leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
        group([
            query(':enter', [
                stagger(
                    500, [
                    style({ transform: 'scale(0)' }),
                    animate('0.5s 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)', style({ transform: 'scale(1)' }))
                ])
            ], { optional: true }),
            query(':leave', [
                style({ opacity: 1 }),
                animate('0.4s cubic-bezier(0.550, 0.085, 0.680, 0.530)', style({ transform: 'scale(0)', opacity: 0 }))
            ], { optional: true }),
        ])
    ])
])