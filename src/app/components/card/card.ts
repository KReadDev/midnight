import { Component, Input } from '@angular/core';
import { Manga } from '../../model/Manga';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [RouterLink,CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
    @Input() manga: Manga = {} as Manga;
}
