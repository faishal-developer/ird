/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, IPost } from "./posts.interface";
import { PostModel } from "./posts.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { CategoryModel } from "../category/category.model";
import { SubCategoryModel } from "../subCategory/subCategory.model";

const createPost = async (newPost: IPost): Promise<IPost | null> => {
  const result = await PostModel.create(newPost);

  await CategoryModel.findOneAndUpdate(
    { _id: newPost.cat_id },
    { $push: { posts: result._id } },
    {
      new: true,
    }
  );
  await SubCategoryModel.findOneAndUpdate(
    { _id: newPost.subcat_id },
    { $push: { posts: result._id } },
    {
      new: true,
    }
  );
  return result;
};

const getAllPost = async (queryData: Partial<IQueryData>) => {
  const { page = "1", limit = "10", sortBy, sortOrder } = queryData;
  const pagination = calcSkip(page, limit);

  //searching
  let query: any = {};

  //sorting condition
  type TSort = "asc" | "desc";
  const sortCondition: { [key: string]: TSort } = {};
  if (sortBy) {
    sortCondition[sortBy] = (sortOrder as TSort) ?? "asc";
  }

  const result = await PostModel.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);

  const total = await PostModel.countDocuments(query);
  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      count: total,
    },
    data: result,
  };
};

const getSinglePost = async (id: string): Promise<IPost | null> => {
  const result = await PostModel.findById({ _id: id });
  return result;
};

const updatePost = async (
  id: string,
  data: Partial<IPost>
): Promise<IPost | null> => {
  const isExist = await PostModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Post not found !");
  }
  if (data.title) {
    const Post = await PostModel.findOne({
      title: data.title,
    });
    if (Post) {
      throw new ApiError(
        409,
        "same seller same named Post is not allowed twice"
      );
    }
  }

  const result = await PostModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deletePost = async ({
  id,
  cat_id,
  subcat_id,
}: {
  id: string;
  cat_id: string;
  subcat_id: string;
}): Promise<IPost | null> => {
  const result = await PostModel.findByIdAndDelete({ _id: id });
  await CategoryModel.findOneAndUpdate(
    { _id: cat_id },
    { $pull: { posts: id } },
    { new: true } // This option returns the updated document
  );
  await SubCategoryModel.findOneAndUpdate(
    { _id: subcat_id },
    { $pull: { posts: id } },
    { new: true } // This option returns the updated document
  );
  return result;
};

export const PostService = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
};
