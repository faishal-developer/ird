import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { SubCategoryService } from "./subCategory.service";
import { ISubCategory } from "./subCategory.interface";

const createSubCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const SubCategoryData: ISubCategory = req.body;
    const result = await SubCategoryService.createSubCategory(SubCategoryData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: result?.title
        ? "SubCategory created successfully"
        : "Failed to create",
      data: result,
    });
  }
);

const getAllSubCategorys = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await SubCategoryService.getAllSubCategory(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result?.data?.[0]
        ? "SubCategory Retrived successfully"
        : "Failed to get",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleSubCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await SubCategoryService.getSingleSubCategory(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message:
        result === null ? "Failed to get" : "SubCategory retrived successfully",
      data: result,
    });
  }
);

const updateSubCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await SubCategoryService.updateSubCategory(id, updatedData);

    sendResponse<ISubCategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result?.title
        ? "SubCategory updated succefully"
        : "Failed to update",
      data: result,
    });
  }
);

const deleteSubCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await SubCategoryService.deleteSubCategory(req.body);

    sendResponse<ISubCategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student deleted successfully!",
      data: result,
    });
  }
);

export const SubCategorysController = {
  createSubCategory,
  getAllSubCategorys,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
