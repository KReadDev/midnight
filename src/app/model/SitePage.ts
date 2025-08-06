import { SiteManga } from "./SiteManga";

export interface SitePage {
    links:PageLink[];
    manga:SiteManga[];
}

export interface PageLink{
    pageNum:string;
    pageLink:string;
}
