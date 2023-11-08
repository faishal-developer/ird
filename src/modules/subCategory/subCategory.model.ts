import { Schema, model } from "mongoose";
import { ISubCategoryModel, ISubCategory } from "./subCategory.interface";

const SubCategorySchema = new Schema<ISubCategory, object>(
  {
    title: {
      type: String,
      required: true,
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

export const SubCategoryModel = model<ISubCategory, ISubCategoryModel>(
  "SubCategory",
  SubCategorySchema
);
