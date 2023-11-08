"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsZodValidataion = void 0;
const zod_1 = require("zod");
const createPost = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        reference: zod_1.z.string().optional(),
        ayat: zod_1.z.string().optional(),
        transileration: zod_1.z.string().optional(),
        translation: zod_1.z.string().optional(),
        audio: zod_1.z.string().optional(),
    }),
});
const updatePost = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        reference: zod_1.z.string().optional(),
        ayat: zod_1.z.string().optional(),
        transileration: zod_1.z.string().optional(),
        translation: zod_1.z.string().optional(),
        audio: zod_1.z.string().optional(),
    }),
});
exports.PostsZodValidataion = {
    createPost,
    updatePost,
};
