import { Injectable } from '@angular/core';
import { Site } from '../model/Site';
import { Gallery } from '../model/Gallery';
import { Manga } from '../model/Manga';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private selectedSite: Site | null = null;
  public showPopup: boolean = false;
  public currentGallery: Gallery | null = null;
  public manga: Manga | null = null;

  setSelectedSite(site: Site) {
    this.selectedSite = site;
  }

  getSelectedSite(): Site | null {
    return this.selectedSite;
  }


}
