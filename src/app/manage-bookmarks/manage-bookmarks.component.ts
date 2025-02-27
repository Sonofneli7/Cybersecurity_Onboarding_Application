import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';


@Component({
  selector: 'app-manage-bookmarks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './manage-bookmarks.component.html',
  styleUrl: './manage-bookmarks.component.scss'
})
export class ManageBookmarksComponent {

  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService, private router: Router) {}
  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks()
  }
}
