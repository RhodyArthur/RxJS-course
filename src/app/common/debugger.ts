import { Observable, observable } from "rxjs";
import { tap } from "rxjs/operators";

export enum RxJsLoggingLevel {
    TRACE,
    DEBUG,
    INFO,
    ERROR
}

let  rxjsLoggingLevel = RxJsLoggingLevel.INFO;

export function setRxJSLoggingLevel(level: RxJsLoggingLevel) {
    rxjsLoggingLevel = level;
}

export const debug = (level:number, message: string) =>
(source: Observable<any>) => source.pipe(
    tap(val => {

        if (val >= rxjsLoggingLevel) {
            console.log(message + ':' + val)
        }
    })
)