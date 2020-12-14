import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'drop',
})
export class DropPipe implements PipeTransform {
    transform(input: any, quantity?: number): any {
        if (!this.isArray(input)) {
            return input;
        }
        return input.slice(quantity || 1, input.length);
    }

    isArray(value: any): boolean {
        return Array.isArray(value);
    }
}