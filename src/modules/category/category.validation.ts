import { z } from "zod";

const createCategory = z.object({
  body: z.object({
    title: z.string({
      required_error: "Name is required",
    }),
    image: z.string({
      required_error: "Name is required",
    }),
    subcat_id: z.array(z.string({ required_error: "Seller is required" })),
    posts: z.array(z.string({ required_error: "Seller is required" })),
  }),
});

const updateCategory = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    subcat_id: z.array(z.string()).optional(),
    posts: z.array(z.string()).optional(),
  }),
});

export const CategorysZodValidataion = {
  createCategory,
  updateCategory,
};
