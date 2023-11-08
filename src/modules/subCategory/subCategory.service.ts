/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, ISubCategory } from "./subCategory.interface";
import { SubCategoryModel } from "./subCategory.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { CategoryModel } from "../category/category.model";

const createSubCategory = async (
  newSubCategory: ISubCategory
): Promise<ISubCategory | null> => {
  if (!newSubCategory.cat_id) {
    throw new ApiError(404, "Category not selected");
  }
  const SubCategory = await SubCategoryModel.findOne({
    title: newSubCategory.title,
  });

  const result = await SubCategoryModel.create(newSubCategory);

  return result;
};

const getAllSubCategory = async (queryData: Partial<IQueryData>) => {
  const { page = "1", limit = "10", sortBy, sortOrder } = queryData;
  const pagination = calcSkip(page, limit);

  //searching
  let query: any = {};

  if (queryData.cat_id) {
    query.cat_id = queryData.cat_id;
  }
  //sorting condition
  type TSort = "asc" | "desc";
  const sortCondition: { [key: string]: TSort } = {};
  if (sortBy) {
    sortCondition[sortBy] = (sortOrder as TSort) ?? "asc";
  }

  const result = await SubCategoryModel.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);

  const total = await SubCategoryModel.countDocuments(query);
  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      count: total,
    },
    data: result,
  };
};

const getSingleSubCategory = async (
  id: string
): Promise<ISubCategory | null> => {
  const result = await SubCategoryModel.findById({ _id: id });
  return result;
};

const updateSubCategory = async (
  id: string,
  data: Partial<ISubCategory>
): Promise<ISubCategory | null> => {
  const isExist = await SubCategoryModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "SubCategory not found !");
  }
  if (data.title) {
    const SubCategory = await SubCategoryModel.findOne({
      title: data.title,
    });
    if (SubCategory) {
      throw new ApiError(
        409,
        "same seller same named SubCategory is not allowed twice"
      );
    }
  }

  const result = await SubCategoryModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteSubCategory = async ({
  id,
}: {
  id: string;
}): Promise<ISubCategory | null> => {
  const result = await SubCategoryModel.findByIdAndDelete({ _id: id });

  return result;
};

export const SubCategoryService = {
  createSubCategory,
  getAllSubCategory,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
