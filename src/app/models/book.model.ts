import { model, Schema } from "mongoose";
import { IBook, IBookModel } from "../interfaces/book.interface";
export enum Genre {
    FICTION = "FICTION",
    NON_FICTION = "NON_FICTION",
    SCIENCE = "SCIENCE",
    HISTORY = "HISTORY",
    BIOGRAPHY = "BIOGRAPHY",
    FANTASY = "FANTASY",
}

const bookSchema = new Schema<IBook, IBookModel>(
    {
        title: {
            type: String,
            required: [true, "Book title is required"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Author name is required"],
            trim: true,
        },
        genre: {
            type: String,
            required: [true, "Genre is required"],
            enum : Object.values(Genre)
        },
        isbn: {
            type: String,
            required: [true, "ISBN is required"],
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        copies: {
            type: Number,
            required: [true, "Number of copies is required"],
            min: [0, "Copies cannot be negative"],
        },
        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

bookSchema.static('updateAvailability', async function (bookId: string, copies: number) {
  if (copies === 0) {
    await this.findByIdAndUpdate(bookId, { available: false });
  }
});

export const Book = model<IBook, IBookModel>("Book", bookSchema);