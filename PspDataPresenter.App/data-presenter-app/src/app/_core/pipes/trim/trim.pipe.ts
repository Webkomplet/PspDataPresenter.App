import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'trim',
})
export class TrimPipe implements PipeTransform {

    transform(input: any): any {
        if (!this._isString(input)) {
            return input;
        }

        return input.trim();
    }

    private _isString(value: any): value is string {
        return typeof value === 'string';
    }
}
