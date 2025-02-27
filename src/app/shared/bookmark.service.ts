import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService implements OnDestroy {
  private bookmarksSubject: BehaviorSubject<Bookmark[]> = new BehaviorSubject<Bookmark[]>([]);
  private storageListenSub: Subscription | undefined;

  initialBookmarks: Bookmark[] = [
    new Bookmark('Krebs on Security', 'https://krebsonsecurity.com/'),
    new Bookmark('Bleeping Computer', 'https://www.bleepingcomputer.com/'),
    new Bookmark('Dark Reading ', 'https://www.darkreading.com/'),
    new Bookmark('Stack Overflow', 'https://stackoverflow.com'),
    new Bookmark('The Hacker News', 'https://thehackernews.com/'),
    new Bookmark('Security Week', 'https://www.securityweek.com/'),
    new Bookmark('CyberScoop', 'https://cyberscoop.com/'),
    new Bookmark('MITRE ATT&CK Framework', 'https://attack.mitre.org/'),
    new Bookmark('CVE Database', 'https://www.cve.org/'),
    new Bookmark('National Vulnerability Database', 'https://www.nist.gov/programs-projects/national-vulnerability-database-nvd'),
    new Bookmark('Exploit Database', 'https://www.exploit-db.com/'),
    new Bookmark('Packet Storm Security', 'https://packetstorm.news/'),
    new Bookmark('TryHackMe', 'https://tryhackme.com/'),
    new Bookmark('Hack the Box', 'https://www.hackthebox.com/'),
    new Bookmark('Cybrary', 'https://www.cybrary.it/'),
    new Bookmark('Over The Wire: Wargames', 'https://overthewire.org/wargames/'),
    new Bookmark('PentesterLab', 'https://pentesterlab.com/'),
    new Bookmark('SANS', 'https://www.sans.org/cyberaces/'),
    new Bookmark('NIST', 'https://www.nist.gov/cyberframework'),
    new Bookmark('OWASP', 'https://owasp.org/'),
    new Bookmark('SANS Internet Storm Center', 'https://isc.sans.edu/'),
    new Bookmark('SHODAN', 'https://www.shodan.io/'),
    new Bookmark('CISA', 'https://www.cisa.gov/'),
    new Bookmark('PYTHON', 'https://www.python.org/'),
    new Bookmark('FTC FOR SMALL BUSINESS', 'https://www.ftc.gov/business-guidance/small-businesses/cybersecurity'),
    new Bookmark('NETSEC: REDDIT', 'https://www.reddit.com/r/netsec/?rdt=44860'),

  ];

  constructor() {
    this.loadState();  // Load bookmarks from local storage on initialization
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  // Get all bookmarks from BehaviorSubject
  getBookmarks(): Bookmark[] {
    return this.bookmarksSubject.getValue();  // Retrieve current bookmarks
  }

  // Get a single bookmark by ID
  getBookmark(id: string): Bookmark | undefined {
    return this.getBookmarks().find((b) => b.id === id);
  }

  // Add a new bookmark
  addBookmark(bookmark: Bookmark): void {
    const bookmarks = this.getBookmarks();
    bookmarks.push(bookmark);
    this.updateBookmarks(bookmarks);
    this.saveState();  // Save state after adding a bookmark
  }

  // Update a bookmark by ID with partial fields
  updateBookmark(id: string, updatedFields: Partial<Bookmark>): void {
    const bookmarks = this.getBookmarks();
    const bookmark = this.getBookmark(id);
    if (bookmark) {
      Object.assign(bookmark, updatedFields);  // Update the bookmark with the provided fields
      this.updateBookmarks(bookmarks);
      this.saveState();  // Save state after updating a bookmark
    } else {
      console.warn(`Bookmark with ID ${id} not found.`);
    }
  }

  // Delete a bookmark by ID
  deleteBookmark(id: string): void {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.findIndex((bookmark) => bookmark.id === id);
    if (index !== -1) {
      bookmarks.splice(index, 1);  // Remove the bookmark from the array
      this.updateBookmarks(bookmarks);
      this.saveState();  // Save state after deleting a bookmark
      console.log(`Bookmark with ID ${id} deleted.`);
    } else {
      console.error(`Bookmark with ID ${id} not found.`);
    }
  }

  // Save the bookmarks to local storage
  saveState(): void {
    localStorage.setItem('bookmarks', JSON.stringify(this.getBookmarks()));
  }

  // Load bookmarks from local storage or fallback to initial bookmarks
  loadState(): void {
    try {
      const bookmarksInStorage = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      if (Array.isArray(bookmarksInStorage) && bookmarksInStorage.length > 0) {
        this.updateBookmarks(bookmarksInStorage);  // Set loaded bookmarks to BehaviorSubject
      } else {
        console.warn('No bookmarks found in local storage, using initial bookmarks.');
        this.updateBookmarks(this.initialBookmarks);  // Use predefined bookmarks
        this.saveState();  // Save default bookmarks to localStorage
      }
    } catch (e) {
      console.error('Failed to load bookmarks from local storage:', e);
      this.updateBookmarks(this.initialBookmarks);  // Reset to initialBookmarks if loading fails
      this.saveState();  // Save default bookmarks to localStorage
    }
  }

  // Emit the updated bookmarks list to the BehaviorSubject
  private updateBookmarks(bookmarks: Bookmark[]): void {
    this.bookmarksSubject.next(bookmarks);  // Emit updated bookmarks
  }

  // Method to update the favicon dynamically based on a URL
  updateFavicon(url: string): void {
    const faviconUrl = this.getFaviconUrl(url);
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = faviconUrl;  // Dynamically set favicon path

    // Ensure favicon is not cached (by adding a timestamp)
    link.href = `${faviconUrl}?timestamp=${new Date().getTime()}`;

    // Add link element to head
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  // Method to update favicon from the stored bookmarks (for page reloads)
  updateFaviconFromStorage(): void {
    if (this.getBookmarks().length > 0) {
      this.updateFavicon(this.getBookmarks()[0].url.toString());  // Use the first bookmark URL for favicon
    } else {
      console.warn('No bookmarks available to set favicon.');
    }
  }

  // Method to get the favicon URL (using Google Favicon API)
  getFaviconUrl(url: string): string {
    return `https://www.google.com/s2/favicons?domain=${url}`;  // Using Google Favicon API
  }
}
