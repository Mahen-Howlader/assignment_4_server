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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouters = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRouters = express_1.default.Router();
exports.bookRouters.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookBody = req.body;
        const book = yield book_model_1.Book.create(bookBody);
        res.status(201).send({
            success: true,
            message: "Book Create successful",
            book
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error.message || "Someting went wrong",
        });
    }
}));
exports.bookRouters.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let data;
        const filter = req.query.filter || "";
        const sortBy = req.query.sortBy || "createdAt";
        const sortParams = (_a = req.query.sort) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
        const sort = sortParams === "desc" ? -1 : sortParams === "asc" ? 1 : "desc";
        const limit = parseInt(req.query.limit) || 10;
        const query = filter ? { genre: filter } : {};
        data = yield book_model_1.Book.find(query).sort({ [sortBy]: sort }).limit(limit);
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Data Get Failed",
            success: false,
            error: error.message || "Someting went wrong",
        });
    }
}));
exports.bookRouters.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield book_model_1.Book.findById(id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                error: `No book found with id: ${id}`,
            });
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        // Check for invalid MongoDB ObjectId error
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid book ID",
                error: `Provided book ID is not a valid MongoDB ObjectId`,
            });
        }
        // Fallback for other unknown errors
        res.status(500).json({
            success: false,
            message: "Failed to retrieve book",
            error: error.message || "Something went wrong",
        });
    }
}));
exports.bookRouters.patch("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.bookId;
        const data = yield book_model_1.Book.findByIdAndUpdate(id, body, { new: true });
        res.send({
            success: true,
            message: "Book updated successfully",
            data
        });
    }
    catch (error) {
        // Check for invalid MongoDB ObjectId error
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid book ID",
                error: `Provided book ID is not a valid MongoDB ObjectId`,
            });
        }
        ;
        res.send({
            "message": "Book updated Validation failed",
            "success": false,
            "error": error.message || "Someting Update Problem",
        });
    }
}));
exports.bookRouters.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        yield book_model_1.Book.findByIdAndDelete(id);
        res.send({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        // Check for invalid MongoDB ObjectId error
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid book ID",
                error: `Provided book ID is not a valid MongoDB ObjectId`,
            });
        }
        ;
        res.send({
            "message": "Book updated Validation failed",
            "success": false,
            "error": error
        });
    }
}));
