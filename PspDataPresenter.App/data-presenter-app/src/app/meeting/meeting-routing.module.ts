import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingComponent } from './meeting.component';

const routes: Routes = [
    {
        path: '',
        component: MeetingComponent,
        children: [
            {
                path: 'standard',
                loadChildren: () => import('./meeting-standard/meeting-standard.module').then(m => m.MeetingStandardModule),
                data: { state: 'meetingStandard', headerStyle: 'normal' }
            },
            {
                path: 'interpellation',
                loadChildren: () => import('./meeting-interpellation/meeting-interpellation.module').then(m => m.MeetingInterpellationModule),
                data: { state: 'meetingInterpellations', headerStyle: 'normal' }
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MeetingRoutingModule { }
