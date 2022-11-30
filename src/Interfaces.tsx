import { UUID } from "bson"

export interface IListItem {
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
    fromUser: string,
    toUser: string,
    itemId: string,
    priceTotal: number,
}

export interface IUser {
    email: string,
    id: string
}