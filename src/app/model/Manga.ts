
export interface Manga {
    id: string;
    name: string;
    cover: string;
    tags: string[];
    pages: number;
    bookmarked: boolean;
    lastRead: string | null | Date;
}