import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingStandardComponent } from './meeting-standard.component';

const routes: Routes = [
    {
        path: '',
        component: MeetingStandardComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MeetingStandardRoutingModule { }
