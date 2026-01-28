export interface Gallery {
    id: string;
    name: string;
    mangaIds: string[];
    isDefault?: boolean;
    count: number;
}