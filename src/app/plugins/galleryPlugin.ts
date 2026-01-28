import {registerPlugin} from '@capacitor/core';
import { Gallery } from '../model/Gallery';
import { Manga } from '../model/Manga';

export interface GalleryPlugin {
    getAllGalleries(): Promise<{ galleries: Gallery[] }>;
    getGalleryById(options:{id: string}): Promise<{ mangas: Manga[] }>;
    addToGallery(optons:{id:string, mangaid:string}): Promise<void>;
    createGallery(options:{gallery: {object:Gallery}}): Promise<{ galleries: Gallery[] }>;
}

const GalleryPlugin = registerPlugin<GalleryPlugin>('Gallery');

export default GalleryPlugin;