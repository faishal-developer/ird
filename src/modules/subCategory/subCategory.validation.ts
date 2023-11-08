import { z } from "zod";

const createSubCategory = z.object({
  body: z.object({
    cat_id: z.string({
      required_error: "cat_id is required",
    }),
    title: z.string({
      required_error: "Name is required",
    }),
    posts: z.array(z.string({ required_error: "Seller is required" })),
  }),
});

const updateSubCategory = z.object({
  body: z.object({
    title: z.string().optional(),
    posts: z.array(z.string()).optional(),
  }),
});

export const SubCategorysZodValidataion = {
  createSubCategory,
  updateSubCategory,
};
