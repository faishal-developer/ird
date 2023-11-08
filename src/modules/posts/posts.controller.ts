import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { PostService } from "./posts.service";
import { IPost } from "./posts.interface";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const PostData: IPost = req.body;
    const result = await PostService.createPost(PostData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: result?.title ? "Post created successfully" : "Failed to create",
      data: result,
    });
  }
);

const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await PostService.getAllPost(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result?.data?.[0]
        ? "Post Retrived successfully"
        : "Failed to get",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSinglePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await PostService.getSinglePost(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result === null ? "Failed to get" : "Post retrived successfully",
      data: result,
    });
  }
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await PostService.updatePost(id, updatedData);

    sendResponse<IPost>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result?.title ? "Post updated succefully" : "Failed to update",
      data: result,
    });
  }
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PostService.deletePost(req.body);

    sendResponse<IPost>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student deleted successfully!",
      data: result,
    });
  }
);

export const PostsController = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
