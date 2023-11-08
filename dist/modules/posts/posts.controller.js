"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const posts_service_1 = require("./posts.service");
const createPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const PostData = req.body;
    const result = yield posts_service_1.PostService.createPost(PostData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: (result === null || result === void 0 ? void 0 : result.title) ? "Post created successfully" : "Failed to create",
        data: result,
    });
}));
const getAllPosts = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const queryData = req.query;
    const result = yield posts_service_1.PostService.getAllPost(queryData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a[0])
            ? "Post Retrived successfully"
            : "Failed to get",
        meta: result.meta,
        data: result.data,
    });
}));
const getSinglePost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield posts_service_1.PostService.getSinglePost(id);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: result === null ? "Failed to get" : "Post retrived successfully",
        data: result,
    });
}));
const updatePost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield posts_service_1.PostService.updatePost(id, updatedData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: (result === null || result === void 0 ? void 0 : result.title) ? "Post updated succefully" : "Failed to update",
        data: result,
    });
}));
const deletePost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_service_1.PostService.deletePost(req.body);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student deleted successfully!",
        data: result,
    });
}));
exports.PostsController = {
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost,
};
