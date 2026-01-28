import { registerPlugin } from "@capacitor/core";
import { Manga } from "../model/Manga";

export interface MangaPlugin {
    getAllManga(): Promise<{ manga: Manga[] }>;
    getMangaById(options:{id: string}): Promise<{ manga: Manga }>;
    bookmark(options:{manga: {object:Manga}}): Promise<void>;
    deleteManga(options:{manga: {object:Manga}}): Promise<void>;
    reorderManga(): Promise<void>;
}

const MangaPlugin = registerPlugin<MangaPlugin>('Manga');

export default MangaPlugin;