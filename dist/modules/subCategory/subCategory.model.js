"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryModel = void 0;
const mongoose_1 = require("mongoose");
const SubCategorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
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
exports.SubCategoryModel = (0, mongoose_1.model)("SubCategory", SubCategorySchema);
