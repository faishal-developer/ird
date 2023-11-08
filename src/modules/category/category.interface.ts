import { Model, Types } from "mongoose";

export type ICategory = {
  subcat_id: Types.ObjectId[];
  posts: Types.ObjectId[];
  title: string;
  image: string;
};

export type ICategoryModel = Model<ICategory, Record<string, unknown>>;

export type IQueryData = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  location?: string;
  searchTerm?: string;
};
