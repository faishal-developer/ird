"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    subcat_id: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Subcat",
    },
    posts: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Post",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.CategoryModel = (0, mongoose_1.model)("Category", CategorySchema);
