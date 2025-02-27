import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<string | null>(null);

  get notifications(): Observable<string | null> {
    return this.notificationSubject.asObservable();
  }

  show(message: string): void {
    this.notificationSubject.next(message);
  }

  clear(): void {
    this.notificationSubject.next(null); // Clear the notification
  }
}
