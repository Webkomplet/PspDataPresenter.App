import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'where', pure: false
})
export class WherePipe implements PipeTransform {
    /**
     * Support a function or a value or the shorthand ['key', value] like the lodash shorthand.
     */
    transform(input: any, fn: any): any {
        if (!this.isArray(input)) {
            return input;
        }

        if (this.isFunction(fn)) {
            return input.filter(fn);
        } else if (this.isArray(fn)) {
            const [key, value] = fn;
            return input.filter((item: any) => this.getProperty(item, key) === value);
        } else if (fn) {
            return input.filter((item: any) => item === fn);
        } else {
            return input;
        }
    }

    isArray(value: any): boolean {
        return Array.isArray(value);
    }

    isFunction(value: any): boolean {
        return typeof value === 'function';
    }

    isNil(value: any): value is null | undefined {
        return value === null || typeof value === 'undefined';
    }

    isObject(value: any): boolean {
        return value !== null && typeof value === 'object';
    }

    getProperty(value: { [key: string]: any }, key: string): any {
        if (this.isNil(value) || !this.isObject(value)) {
            return undefined;
        }

        const keys: string[] = key.split('.');
        let result: any = value[keys.shift()!];

        for (const key of keys) {
            if (this.isNil(result) || !this.isObject(result)) {
                return undefined;
            }

            result = result[key];
        }

        return result;
    }
}