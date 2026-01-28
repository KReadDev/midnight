import { registerPlugin } from "@capacitor/core";
import { SiteManga } from "../model/SiteManga";

export interface SiteMangaPlugin{
    getSiteMangaById(options:{id:string,mangaid:string}):Promise<{siteManga: SiteManga}>
    createSiteManga(options:{id:string,siteManga: {object:SiteManga}}):Promise<void>
}

const SiteMangaPlugin = registerPlugin<SiteMangaPlugin>("SiteManga");

export default SiteMangaPlugin;