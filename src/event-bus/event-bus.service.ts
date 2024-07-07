import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class EventBusService {
  private eventSubject = new Subject<any>();

  get events$() {
    return this.eventSubject.asObservable();
  }

  publish(event: any) {
    this.eventSubject.next(event);
  }
}
