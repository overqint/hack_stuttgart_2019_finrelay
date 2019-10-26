import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PubSubService {

    event$ = new Subject();

    publish(event) {
        this.event$.next(event);
    }

}