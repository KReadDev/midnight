import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteMangaService } from '../../services/site-manga.service';
import { SiteService } from '../../services/site.service';
import { SiteManga } from '../../model/SiteManga';
import { CommonModule } from '@angular/common';
import SiteMangaPlugin from '../../plugins/siteMangaPlugin';

@Component({
  selector: 'app-site-manga',
  imports: [CommonModule],
  templateUrl: './site-manga.html',
  styleUrl: './site-manga.css'
})
export class SiteMangaView {

  manga: SiteManga = {} as SiteManga ;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    private siteMangaService: SiteMangaService,
    private router: Router
  ) {}

  async ngOnInit(){
    const mangaid = this.route.snapshot.paramMap.get('mangaid');
    const siteid = this.route.snapshot.paramMap.get('id');
    // this.siteMangaService.getSiteMangaById(mangaid!).subscribe(manga => this.manga = manga);
    const sitemanga = (await SiteMangaPlugin.getSiteMangaById({id: siteid!,mangaid: mangaid!})).siteManga;
    this.manga = sitemanga;
    // console.log("manga ",sitemanga)

  }

  downloadManga(){
    // this.siteMangaService.downloadManga(this.manga).subscribe();
    const siteid = this.route.snapshot.paramMap.get('id');
    SiteMangaPlugin.createSiteManga({id: siteid!,siteManga: {object: this.manga}});
  }

  searchTag(tag: string){
    tag = tag.trim().replace(" ", "-");
    this.router.navigate(['/sites', this.route.snapshot.paramMap.get('id')], {
      queryParams: {
        tags: tag,
      }
    });
    
    
  }


}
