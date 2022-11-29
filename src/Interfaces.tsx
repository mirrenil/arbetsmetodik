import { UUID } from "bson"

export interface IlistItem {
    title: string,
    description: string,
    image: string,
    price: number,
    category: string,
    id: string
}

export interface IRequest {
    accepted: boolean,
    createdAt: Date,
    formUser: string,
    toUser: string,
    itemId: string,
    priceTotal: number,
}