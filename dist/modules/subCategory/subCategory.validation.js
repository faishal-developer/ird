"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategorysZodValidataion = void 0;
const zod_1 = require("zod");
const createSubCategory = zod_1.z.object({
    body: zod_1.z.object({
        cat_id: zod_1.z.string({
            required_error: "cat_id is required",
        }),
        title: zod_1.z.string({
            required_error: "Name is required",
        }),
    }),
});
const updateSubCategory = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        posts: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.SubCategorysZodValidataion = {
    createSubCategory,
    updateSubCategory,
};
