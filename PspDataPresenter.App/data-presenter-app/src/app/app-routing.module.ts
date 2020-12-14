import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./default/default.module').then(m => m.DefaultModule),
    data: { state: 'default', headerStyle: 'hidden' }
  },{
    path: 'meeting',
    loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingModule),
    data: { state: 'meeting', headerStyle: 'normal' }
  },
  {
    path: 'voting',
    loadChildren: () => import('./voting/voting.module').then(m => m.VotingModule),
    data: { state: 'voting', headerStyle: 'normalWithoutStopwatch' }
  },
  {
    path: 'votingResults',
    loadChildren: () => import('./voting-results/voting-results.module').then(m => m.VotingResultsModule),
    data: { state: 'votingResults', headerStyle: 'normal' }
  },  
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
    data: { state: 'notification', headerStyle: 'expanded' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      enableTracing: false,
      useHash: false,
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'corrected'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
