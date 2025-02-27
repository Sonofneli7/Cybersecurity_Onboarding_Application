import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmark-tile',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './bookmark-tile.component.html',
  styleUrls: ['./bookmark-tile.component.scss']
})
export class BookmarkTileComponent implements OnInit {
  @Input() bookmark!: { url: string; name: string }; 

  faviconError: boolean = false; 
  tileIconSrc: string = ''; 
  firstLetter: string = ''; 
  name: string = ''; 

  ngOnInit(): void {
    if (this.bookmark) {
      this.name = this.bookmark.name;
      this.tileIconSrc = this.getFaviconUrl(this.bookmark.url);
      this.firstLetter = this.name[0] || ''; 
    }
  }

  // Construct the favicon URL based on the bookmark URL
  getFaviconUrl(url: string): string {
    const domain = new URL(url).origin; // Extract domain from the URL
    return `${domain}/favicon.ico`; // Standard path for favicons
  }

  // Handle favicon load error
  onFaviconError(): void {
    this.faviconError = true;
  }
}