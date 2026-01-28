import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { SiteManga } from '../../model/SiteManga';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../components/card/card';
import { PageLink } from '../../model/SitePage';
import { FormsModule } from '@angular/forms';
import SitePlugin from '../../plugins/sitePlugin';

@Component({
  selector: 'app-site-view',
  imports: [CommonModule,Card,FormsModule],
  templateUrl: './site-view.html',
  styleUrl: './site-view.css'
})
export class SiteView {

  SiteManga: SiteManga[] = [];
  protected readonly viewMode = signal<'grid' | 'list'>('grid');
  isPaginationOpen = false; 
  searchTerm: string = '';

  pages: PageLink[] = [];

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.getMangaPage();
    // this.route.queryParams.subscribe(params => {
    //   this.getMangaPage();
    // });
  }

  ngOnInit(): void {
    // this.siteService.getAllSites().subscribe(sites => this.SiteManga = sites);
    const id = this.route.snapshot.paramMap.get('id');
    
    // this.siteService.getSiteById(id!).subscribe(site =>{
    //   this.SiteManga = site.manga;
    //   this.pageLinks = site.links;
    // });
    // this.getMangaPage();
    this.getMangaPage();
    this.route.queryParams.subscribe(params => {
      this.getMangaPage();
    });

    
  }

  async getMangaPage(){
    const id = this.route.snapshot.paramMap.get('id');

    const search = this.route.snapshot.queryParamMap.get('search');
    const tags = this.route.snapshot.queryParamMap.get('tags');
    let pager = this.route.snapshot.queryParamMap.get('pager');
    const page = this.route.snapshot.queryParamMap.get('page');

    if(pager){
      if(page){
        pager = pager +'&page='+page;
      }
      // this.siteService.getSiteByPage(id!,pager).subscribe(site =>{
      //   this.SiteManga = site.manga;
      //   this.pages = site.links;
      // });
      const sitedata = (await SitePlugin.getPagelinks({id: id!, page: pager!})).sitepage
      this.SiteManga = sitedata.manga;
      this.pages = sitedata.links;
    } else if(search){
      // console.log(search);
      
      // this.siteService.findTerm(id!,search).subscribe(site =>{
      //   this.SiteManga = site.manga;
      //   this.pages = site.links;
      // });
      const sitedata = (await SitePlugin.getSearchTerm({id: id!, term: search})).sitepage
      this.SiteManga = sitedata.manga;
      this.pages = sitedata.links;
    } else if(tags){
      // this.siteService.filterTerm(id!,tags).subscribe(site =>{
      //   this.SiteManga = site.manga;
      //   this.pages = site.links;
      // });
      const sitedata = (await SitePlugin.getTagFilter({id: id!, term: tags!})).sitepage
      this.SiteManga = sitedata.manga;
      this.pages = sitedata.links;
    } else {
      // this.siteService.getSiteById(id!).subscribe(site =>{
      //   this.SiteManga = site.manga;
      //   this.pages = site.links;
      // });
      const sitedata = (await SitePlugin.getSiteById({id: id!})).sitepage
      this.SiteManga = sitedata.manga;
      this.pages = sitedata.links;
    }
  }

  isGridView(): boolean {
    return this.viewMode() === 'grid';
  }

  setGridView(): void {
    this.viewMode.set('grid');
  }

  setListView(): void {
    this.viewMode.set('list');
  }

  setPaginationOpen(): void {
    this.isPaginationOpen = true;
  }

  setPaginationClose(): void {
    this.isPaginationOpen = false;
  }

  goToPage(page: PageLink): void {
    this.router.navigate(['/sites', this.route.snapshot.paramMap.get('id')], {
      queryParams: {
        pager: page.pageLink,
      }
    });
  }

  goToManga(manga: SiteManga): void {
    // console.log("manga.id",manga.id);
    
    this.router.navigate(['/sites', this.route.snapshot.paramMap.get('id'), manga.id]);
  }

  searchManga() {
    this.router.navigate(['/sites', this.route.snapshot.paramMap.get('id')], {
      queryParams: {
        search: this.searchTerm,
      }
    });
  }

  // search
}
