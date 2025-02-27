import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss'],
})
export class EditBookmarkComponent implements OnInit {
  showValidationErrors = false;
  bookmark: Bookmark | null | undefined = null;
  notificationMessage: string | null = null;  // Added property for notifications

  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Subscribe to notifications
    this.notificationService.notifications.subscribe((message) => {
      this.notificationMessage = message;
    });

    // Fetch the bookmark based on the route parameter
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id');
      if (bookmarkId) {
        this.bookmark = this.bookmarkService.getBookmark(bookmarkId);
      }
    });
  }

  onFormSubmit(form: NgForm): void {
    if (!form.valid) {
      this.showValidationErrors = true;
      return;
    }

    if (this.bookmark?.id) {
      const { name, url } = form.value;
      try {
        // Ensure URL is valid before updating
        const parsedUrl = new URL(url);  // This will throw if URL is invalid

        // If url in the model is a string, convert URL object to string
        const urlString = parsedUrl.toString(); // Convert to string if needed

        // Update the bookmark in the service (ensure the service expects the correct type)
        this.bookmarkService.updateBookmark(this.bookmark.id, {
          name,
          url: urlString,  // Pass the string version of URL
        });

        this.showNotification('Bookmark Updated Successfully!');
        this.navigateAfterNotification();
      } catch (error) {
        console.error('Error updating bookmark:', error);
        this.showNotification('Failed to update bookmark.');
      }
    }
  }

  deleteBookmark(): void {
    if (this.bookmark?.id) {
      this.bookmarkService.deleteBookmark(this.bookmark.id);
      this.notificationService.show('Bookmark Deleted!');
      this.router.navigate(['/bookmarks']);
    }
  }

  // Helper function to show notifications
  private showNotification(message: string): void {
    this.notificationMessage = message;
    setTimeout(() => (this.notificationMessage = null), 3000);
  }

  // Helper function to handle redirection after notification
  private navigateAfterNotification(): void {
    setTimeout(() => this.router.navigate(['/bookmarks']), 3000);
  }
}
