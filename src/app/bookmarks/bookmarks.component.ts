import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookmarkTileComponent } from "../bookmark-tile/bookmark-tile.component";
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop'; // Import DragDropModule

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule, BookmarkTileComponent, DragDropModule],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }

  onDrop(event: CdkDragDrop<Bookmark[]>): void {
    moveItemInArray(this.bookmarks, event.previousIndex, event.currentIndex);
  }
}






// ng s -o   Opens application automatically