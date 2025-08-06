import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Chapter {
  id: number;
  number: number;
  title: string;
  date: string;
  read: boolean;
}

interface MangaDetail {
  id: number;
  title: string;
  author: string;
  status: string;
  description: string;
  image: string;
  genres: string[];
  chapters: Chapter[];
  rating: number;
  totalChapters: number;
}

@Component({
  selector: 'app-manga-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.css']
})
export class MangaDetailComponent implements OnInit {
  manga: MangaDetail | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadMangaDetail(Number(id));
  }

  private loadMangaDetail(id: number) {
    // Mock data - in a real app, this would come from a service
    this.manga = {
      id: id,
      title: 'One Piece',
      author: 'Eiichiro Oda',
      status: 'Ongoing',
      description: 'Monkey D. Luffy sails with his crew of Straw Hat Pirates through the Grand Line to find the treasure One Piece and become the next king of the pirates.',
      image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Shounen'],
      rating: 9.2,
      totalChapters: 1090,
      chapters: [
        { id: 1090, number: 1090, title: 'Kizaru', date: '2023-11-20', read: false },
        { id: 1089, number: 1089, title: 'Siege', date: '2023-11-13', read: true },
        { id: 1088, number: 1088, title: 'Final Lesson', date: '2023-11-06', read: true }
      ]
    };
  }
}