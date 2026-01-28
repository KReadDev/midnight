import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteService } from '../../services/site.service';
import { Site } from '../../model/Site';
import { RouterLink } from '@angular/router';
import SitePlugin from '../../plugins/sitePlugin';


@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent {

  constructor(private siteService: SiteService) {}

  async ngOnInit(): Promise<void> {
    // this.siteService.getAllSites().subscribe(sites => this.sites = sites);
    this.sites = (await SitePlugin.getAllSites()).sites
  }

  sites: Site[] = [];
}