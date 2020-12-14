import { Pipe } from "@angular/core";

@Pipe({
    name: 'truncate', pure: false
})
export class TruncatePipe {
    transform(value: string, args: string): string {

        if (value == null || value === undefined) { return value; }

        // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
        // let trail = args.length > 1 ? args[1] : '...';
        let limit = args ? parseInt(args, 10) : 10;
        let trail = '...';

        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}