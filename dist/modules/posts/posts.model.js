"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
    },
    ayat: {
        type: String,
    },
    transileration: {
        type: String,
    },
    translation: {
        type: String,
    },
    audio: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.PostModel = (0, mongoose_1.model)("Post", PostSchema);
