export enum ReqStatus {
  pending = 0,
  declined = 1,
  accepted = 2
}

export interface IListItem {
  authorID: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  location: string;
  id: string;
}

export interface IRequest {
  accepted: ReqStatus;
  createdAt: Date;
  fromUserId: string;
  fromUserName: string,
  toUser: string;
  itemId: string;
  priceTotal: number;
  id?: string;
}

export interface IUser {
  email: string;
  displayName: string;
  id: string;
}

export interface Category {
  img: string;
  title: string;
  id: string;
}
