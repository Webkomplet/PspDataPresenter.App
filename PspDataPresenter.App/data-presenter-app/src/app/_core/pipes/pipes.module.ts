import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropPipe } from './drop/drop.pipe';
import { OrderByPipe } from './orderBy/orderBy.pipe';
import { ReplaceLinebreaksPipe } from './replaceLinebreaks/replace-linebreaks.pipe';
import { TakePipe } from './take/take.pipe';
import { TrimPipe } from './trim/trim.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
import { WherePipe } from './where/where.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [TruncatePipe, WherePipe, DropPipe, OrderByPipe, TakePipe, TrimPipe, ReplaceLinebreaksPipe],
    exports: [TruncatePipe, WherePipe, DropPipe, OrderByPipe, TakePipe, TrimPipe, ReplaceLinebreaksPipe]
})
export class PipesModule { }
