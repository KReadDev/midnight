import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../components/card/card';
import { Manga } from '../../model/Manga';



@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, RouterLink,Card],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent {
  bookmarkedManga: Manga[] = [
    {
      id: "1",
      name: 'One Piece',
      cover: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Action', 'Adventure'],
      pages: 1090,
      bookmarked: false,
      lastRead: 'Chapter 1089'
    },
    {
      id: "2",
      name: 'My Hero Academia',
      cover: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Action', 'Superhero'],
      pages: 403,
      bookmarked: false,
      lastRead: 'Chapter 403'
    }
  ];
}