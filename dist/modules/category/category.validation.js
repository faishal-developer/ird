"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorysZodValidataion = void 0;
const zod_1 = require("zod");
const createCategory = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Name is required",
        }),
        image: zod_1.z.string({
            required_error: "Name is required",
        }),
        subcat_id: zod_1.z.array(zod_1.z.string({ required_error: "Seller is required" })),
        posts: zod_1.z.array(zod_1.z.string({ required_error: "Seller is required" })),
    }),
});
const updateCategory = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        subcat_id: zod_1.z.array(zod_1.z.string()).optional(),
        posts: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.CategorysZodValidataion = {
    createCategory,
    updateCategory,
};
