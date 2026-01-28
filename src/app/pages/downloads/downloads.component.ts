import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadService } from '../../services/download.service';
import { DownloadData } from '../../model/Download';
import DownloadPlugin from '../../plugins/downloadPlugin';

interface Download {
  id: number;
  title: string;
  source: string;
  progress: number;
  status: 'active' | 'completed' | 'failed' | 'paused';
  speed?: string;
}

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent {
  activeDownloads: DownloadData[] = [];
  completedDownloads: DownloadData[] = [];
  failedDownloads: DownloadData[] = [];

  interval: any;

  constructor(
    private downloadService: DownloadService
  ) {}



  ngOnInit(): void {
    this.interval = setInterval(() => this.fetchDownloads(), 1000);
    // this.fetchDownloads();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  async fetchDownloads(){
    // this.downloadService.getDownloads().subscribe((downloads) => {
    //   this.activeDownloads = downloads.filter((download) => download.status === 'downloading');
    //   this.completedDownloads = downloads.filter((download) => download.status === 'completed');
    //   this.failedDownloads = downloads.filter((download) => download.status === 'failed');
    // });
    const downloads = (await DownloadPlugin.getAllDownloads()).downloads;
    this.activeDownloads = downloads.filter((download) => download.status === 'downloading');
    this.completedDownloads = downloads.filter((download) => download.status === 'completed');
    this.failedDownloads = downloads.filter((download) => download.status === 'failed');
  }

  openTab(tab: string,event: Event){
    const tabList = document.getElementsByClassName('downloads-list');
    for (let i = 0; i < tabList.length; i++) {
      // (tabList[i] as HTMLElement).style.display = 'none';
      tabList[i].classList.remove('openTab');
    }
    
    const tabItems = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabItems.length; i++) {
      tabItems[i].classList.remove('active');
      // tabItems[i].style.display = 'none';
    }

    (event.currentTarget as HTMLElement).classList.add('active');
    document.getElementById(tab)?.classList.add('openTab');
    // (document.getElementById(tab) as HTMLElement).style.display = "flex";

    // const activeTab = document.getElementById(tab);
    // activeTab?.classList.add('active');
    // activeTab?.style.display = 'block';
  }



}