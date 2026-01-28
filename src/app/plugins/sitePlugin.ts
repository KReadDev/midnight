import { registerPlugin } from "@capacitor/core";
import { Site } from "../model/Site";
import { SitePage } from "../model/SitePage";

export interface SitePlugin{
    getAllSites():Promise<{ sites:Site[]}>;
    getSiteById(options: {id:string}): Promise<{sitepage: SitePage}>
    getPagelinks(options: {id:string, page:string}): Promise<{sitepage: SitePage}>
    getSearchTerm(options: {id:string, term:string}): Promise<{sitepage: SitePage}>
    getTagFilter(options: {id:string, term:string}): Promise<{sitepage: SitePage}>


}

const SitePlugin = registerPlugin<SitePlugin>("Site");

export default SitePlugin;