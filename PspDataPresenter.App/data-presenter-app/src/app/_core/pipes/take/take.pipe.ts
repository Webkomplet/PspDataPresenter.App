import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'take',
})
export class TakePipe implements PipeTransform {
    transform(input: any, quantity?: number): any {
        if (!this.isArray(input)) {
            return input;
        }

// It doesnt matter if quantity is zero or negative - slice          
        return input.slice(0, quantity || 1);
    }

    isArray(value: any): boolean {
        return Array.isArray(value);
    }
}