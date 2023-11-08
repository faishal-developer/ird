import { Schema, model } from "mongoose";
import { ISubCategoryModel, ISubCategory } from "./subCategory.interface";

const SubCategorySchema = new Schema<ISubCategory, object>(
  {
    title: {
      type: String,
      required: true,
    },
    cat_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
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
  "Subcat",
  SubCategorySchema
);
