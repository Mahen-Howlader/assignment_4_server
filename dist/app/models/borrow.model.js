"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book reference is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Borrow quantity is required"],
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: (value) => Number.isInteger(value),
            message: "Quantity must be an integer",
        },
    },
    dueDate: {
        type: String,
        required: [true, "Due date is required"],
    }
}, {
    timestamps: true,
    versionKey: false,
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
