import { Schema, model } from "mongoose";
import { ICategoryModel, ICategory } from "./category.interface";

const CategorySchema = new Schema<ICategory, object>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    subcat_id: {
      type: [Schema.Types.ObjectId],
      ref: "Subcat",
    },
    posts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const CategoryModel = model<ICategory, ICategoryModel>(
  "Category",
  CategorySchema
);
