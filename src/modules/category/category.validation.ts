import { z } from "zod";

const createCategory = z.object({
  body: z.object({
    title: z.string({
      required_error: "Name is required",
    }),
    image: z.string({
      required_error: "Name is required",
    }),
  }),
});

const updateCategory = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const CategorysZodValidataion = {
  createCategory,
  updateCategory,
};
