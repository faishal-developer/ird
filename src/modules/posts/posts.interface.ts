import { Model, Types } from "mongoose";

export type IPost = {
  title: string;
  reference: string;
  ayat: string;
  transileration: string;
  translation: string;
  audio: string;
  cat_id: Types.ObjectId;
  subcat_id: Types.ObjectId;
};

export type IPostModel = Model<IPost, Record<string, unknown>>;

export type IQueryData = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  location?: string;
  searchTerm?: string;
  cat_id?: string;
  subcat_id?: string;
};
