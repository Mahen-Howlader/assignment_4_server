"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.Genre = void 0;
const mongoose_1 = require("mongoose");
var Genre;
(function (Genre) {
    Genre["FICTION"] = "FICTION";
    Genre["NON_FICTION"] = "NON_FICTION";
    Genre["SCIENCE"] = "SCIENCE";
    Genre["HISTORY"] = "HISTORY";
    Genre["BIOGRAPHY"] = "BIOGRAPHY";
    Genre["FANTASY"] = "FANTASY";
})(Genre || (exports.Genre = Genre = {}));
const bookSchema = new mongoose_1.Schema({
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
        enum: Object.values(Genre)
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
}, {
    timestamps: true,
    versionKey: false
});
bookSchema.static('updateAvailability', function (bookId, copies) {
    return __awaiter(this, void 0, void 0, function* () {
        if (copies === 0) {
            yield this.findByIdAndUpdate(bookId, { available: false });
        }
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
