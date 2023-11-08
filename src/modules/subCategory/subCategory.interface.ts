import { Model, Types } from "mongoose";

export type ISubCategory = {
  // posts: Types.ObjectId[];
  title: string;
  cat_id: Types.ObjectId;
};

export type ISubCategoryModel = Model<ISubCategory, Record<string, unknown>>;

export type IQueryData = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  location?: string;
  searchTerm?: string;
  cat_id?: string;
};
