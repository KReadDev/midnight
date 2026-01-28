import { Component, Input } from '@angular/core';
import { Manga } from '../../model/Manga';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SiteManga } from '../../model/SiteManga';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
    @Input() manga: Manga | SiteManga = {} as Manga | SiteManga;
}
