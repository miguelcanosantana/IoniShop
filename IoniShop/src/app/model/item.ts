export class Item {
    itemId?: string;
    name: string;
    photo: string;
    price: number;
    shortDesc: string;
    longDesc: string;
    category: string;
    count?: number; //For counting Cart items
}
