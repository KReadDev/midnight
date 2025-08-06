import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface BookmarkedManga {
  id: number;
  title: string;
  chapters: number;
  image: string;
  genres: string[];
  lastChapter: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent {
  bookmarkedManga: BookmarkedManga[] = [
    {
      id: 1,
      title: 'One Piece',
      chapters: 1090,
      image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      genres: ['Action', 'Adventure'],
      lastChapter: 'Chapter 1090',
      isFavorite: true
    },
    {
      id: 2,
      title: 'My Hero Academia',
      chapters: 403,
      image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      genres: ['Action', 'Superhero'],
      lastChapter: 'Chapter 403',
      isFavorite: true
    }
  ];
}