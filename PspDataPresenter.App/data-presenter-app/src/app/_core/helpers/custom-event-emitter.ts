import { EventEmitter } from "@angular/core";
import { ObjectUnsubscribedError } from "rxjs";

export class CustomEventEmitter<T> extends EventEmitter<T> {

    private _value: T;

    constructor() {
        super();
    }

    get value(): T {
        return this.getValue();
    }

    getValue(): T {
        if (this.hasError) {
            throw this.thrownError;
        } else if (this.closed) {
            throw new ObjectUnsubscribedError();
        } else {
            return this._value;
        }
    }

    emit(value?: T) {
        super.emit(this._value = value);
    }
}