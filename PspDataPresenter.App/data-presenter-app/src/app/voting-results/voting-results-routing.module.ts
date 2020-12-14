import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotingResultsComponent } from './voting-results.component';

const routes: Routes = [
    {
        path: '',
        component: VotingResultsComponent        
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VotingResultsRoutingModule {}
