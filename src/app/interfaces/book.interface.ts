import { Model } from "mongoose";
import { Genre } from "../models/book.model";

export interface IBook {
    title: string;
    author: string;
    genre: Genre;
    isbn: string;
    description: string;
    copies: number;
    available?: boolean;
}

export interface IBookModel extends Model<IBook>{
    updateAvailability(bookId : string, copies : number) : Promise<void>;
}
