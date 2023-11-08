import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { CategoryService } from "./category.service";
import { ICategory } from "./category.interface";

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const CategoryData: ICategory = req.body;
    const result = await CategoryService.createCategory(CategoryData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: result?.title ? "Category created successfully" : "Failed",
      data: result,
    });
  }
);

const getAllCategorys = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await CategoryService.getAllCategory(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result?.data?.[0]
        ? "Category Retrived successfully"
        : "Failed to create",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await CategoryService.getSingleCategory(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message:
        result === null ? "Failed to get" : "Category retrived successfully",
      data: result,
    });
  }
);

const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await CategoryService.updateCategory(id, updatedData);

    sendResponse<ICategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result?.title
        ? "Category updated succefully"
        : "Failed to update",
      data: result,
    });
  }
);

const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await CategoryService.deleteCategory(id);

    sendResponse<ICategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student deleted successfully!",
      data: result,
    });
  }
);

export const CategorysController = {
  createCategory,
  getAllCategorys,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
