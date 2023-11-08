/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, ICategory } from "./category.interface";
import { CategoryModel } from "./category.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { SortOrder } from "mongoose";
import { maxNumber } from "../../utils/utils";
import { CategorySearchableFields } from "./category.constant";

const createCategory = async (
  newCategory: ICategory
): Promise<ICategory | null> => {
  const Category = await CategoryModel.findOne({ title: newCategory.title });
  if (Category) {
    throw new ApiError(409, "Category allready exist");
  }
  const result = await CategoryModel.create(newCategory);
  return result;
};

const getAllCategory = async (queryData: Partial<IQueryData>) => {
  const { page = "1", limit = "10", sortBy, sortOrder, searchTerm } = queryData;
  const pagination = calcSkip(page, limit);

  //searching
  let query: any = {};

  //searchTerm
  if (searchTerm) {
    query["$or"] = CategorySearchableFields.map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: "i",
      },
    }));
  }

  //sorting condition
  type TSort = "asc" | "desc";
  const sortCondition: { [key: string]: TSort } = {};
  if (sortBy) {
    sortCondition[sortBy] = (sortOrder as TSort) ?? "asc";
  }

  const result = await CategoryModel.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);

  const total = await CategoryModel.countDocuments(query);
  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      count: total,
    },
    data: result,
  };
};

const getSingleCategory = async (id: string): Promise<ICategory | null> => {
  const result = await CategoryModel.findById({ _id: id });
  return result;
};

const updateCategory = async (
  id: string,
  data: Partial<ICategory>
): Promise<ICategory | null> => {
  const isExist = await CategoryModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found !");
  }
  if (data.title) {
    const Category = await CategoryModel.findOne({
      title: data.title,
    });
    if (Category) {
      throw new ApiError(
        409,
        "same seller same named Category is not allowed twice"
      );
    }
  }

  const result = await CategoryModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteCategory = async (id: string): Promise<ICategory | null> => {
  const result = await CategoryModel.findByIdAndDelete({ _id: id });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
