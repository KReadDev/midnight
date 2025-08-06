import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MangaSite {
  id: number;
  name: string;
  icon: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent {
  sites: MangaSite[] = [
    {
      id: 1,
      name: 'MangaPlus',
      icon: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=48',
      url: 'https://mangaplus.shueisha.co.jp',
      description: 'Official manga reading platform by Shueisha with free chapters from popular series.'
    }
  ];
}