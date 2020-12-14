import { trigger, transition, style, animate } from "@angular/animations";

export const ngForItemAnimation = trigger(
    'ngForItemAnimation',
    [
        transition(
            ':enter',
            [
                style({ height: 0, opacity: 0, 'margin-bottom': 0 }),
                animate('1s 1s ease-in', style({ height: '*', opacity: 1, 'margin-bottom': '*' }))
            ]
        ),
        transition(
            ':leave',
            [
                style({ height: '*', opacity: 1, 'margin-bottom': '*' }),
                animate('1s ease-out', style({ height: 0, opacity: 0, 'margin-bottom': 0 }))
            ]
        )
    ]
)
