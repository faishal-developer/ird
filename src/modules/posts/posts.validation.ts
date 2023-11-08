import { z } from "zod";

const createPost = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    reference: z.string().optional(),
    ayat: z.string().optional(),
    transileration: z.string().optional(),
    translation: z.string().optional(),
    audio: z.string().optional(),
    cat_id: z.string({
      required_error: "category is required",
    }),
    subcat_id: z.string({
      required_error: "subcategory is required",
    }),
  }),
});

const updatePost = z.object({
  body: z.object({
    title: z.string().optional(),
    reference: z.string().optional(),
    ayat: z.string().optional(),
    transileration: z.string().optional(),
    translation: z.string().optional(),
    audio: z.string().optional(),
  }),
});

export const PostsZodValidataion = {
  createPost,
  updatePost,
};
