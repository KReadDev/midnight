
export interface Manga {
    id: string;
    name: string;
    cover: string;
    tags: string[];
    pages: number;
    bookmarked: boolean;
    pdf: string;
    lastRead: string | null | Date;
}