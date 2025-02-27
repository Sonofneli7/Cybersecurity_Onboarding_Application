import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';


@Component({
  selector: 'app-add-bookmark',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss'] 
})
export class AddBookmarkComponent implements OnInit {
 

    showValidationErrors: boolean | undefined;
  
    constructor(private bookmarkService: BookmarkService, private router: Router) {}
  
    ngOnInit(): void {}
  
    onFormSubmit(form: NgForm): void {  // Update return type to void
      const { name, url} = form.value
      const bookmark = new Bookmark(name, url)
      this.bookmarkService.addBookmark(bookmark);
      this.router.navigateByUrl('/bookmarks');
    }
  }

