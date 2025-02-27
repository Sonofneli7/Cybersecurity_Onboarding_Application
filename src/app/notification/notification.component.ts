import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../shared/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notification: any;
  private subscription: Subscription = Subscription.EMPTY;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications.subscribe(
      (notification: string | null) => {
        this.notification = notification;
        if (notification) {
          // Auto-clear the notification after 5 seconds
          setTimeout(() => {
            this.notificationService.clear(); // Clear the notification via the service
          }, 5000);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
