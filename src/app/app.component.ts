import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule and DatePipe
import { BookmarkService } from './shared/bookmark.service';
import { Bookmark } from './shared/bookmark.model';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { TabsComponent } from './tabs/tabs.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { NotificationComponent } from "./notification/notification.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, TabsComponent, EditTodoComponent, NotificationComponent], // Include CommonModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  bg: string = ''; // Initially empty, will be set to Unsplash image
  bookmarks: Bookmark[] = [];
  dateTime: Date = new Date(); // Current date and time
  private intervalId!: number; 

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
    this.fetchRandomImage(); // Fetch random image when the component is initialized
    this.startClock(); // Start periodic time updates
  }

  ngOnDestroy(): void {
    this.stopClock(); // Clear the interval to prevent memory leaks
  }

  private startClock(): void {
    this.intervalId = window.setInterval(() => {
      this.dateTime = new Date(); // Update the current time every second
    }, 1000);
  }

  private stopClock(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear the interval when the component is destroyed
    }
  }

  // Method to fetch a random image from a specific Unsplash collection
  async fetchRandomImage() {
    const accessKey = 'Iq72zHYuue1fKe1Z60plGTxkYkC1okbBtisiBFHIhkY';
    const collectionId = '4xpuc7vUj_0'; // Replace with your desired collection ID
  
    try {
      const response = await fetch(
        `https://api.unsplash.com/collections/${collectionId}/photos?client_id=${accessKey}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching image: ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data.length > 0) {
        const randomImage = data[Math.floor(Math.random() * data.length)]; // Select a random image from the collection
        const imageUrl = randomImage?.urls?.regular; // Get the 'regular' size image URL
        if (imageUrl) {
          this.bg = imageUrl; // Set the bg property with the new image URL
        }
      } else {
        console.error('No images found in the collection');
        this.bg = 'https://wallpaperset.com/w/full/2/2/8/92481.jpg'; // Fallback background image
      }
    } catch (error) {
      console.error('Error fetching random image from Unsplash:', error);
      this.bg = 'https://wallpaperset.com/w/full/2/2/8/92481.jpg'; // Fallback background image in case of error
    }
  }

  // Allow users to refresh the background manually
  async changeBGImage() {
    await this.fetchRandomImage();
  }
}
