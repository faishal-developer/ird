import { Schema, model } from "mongoose";
import { IPostModel, IPost } from "./posts.interface";

const PostSchema = new Schema<IPost, object>(
  {
    title: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
    },
    ayat: {
      type: String,
    },
    transileration: {
      type: String,
    },
    translation: {
      type: String,
    },
    audio: {
      type: String,
    },
    cat_id: {
      type: Schema.ObjectId,
      required: true,
    },
    subcat_id: {
      type: Schema.ObjectId,
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

export const PostModel = model<IPost, IPostModel>("Post", PostSchema);
