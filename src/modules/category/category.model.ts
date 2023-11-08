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
