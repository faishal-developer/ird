"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.PostService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const posts_model_1 = require("./posts.model");
const ApiError_1 = __importDefault(require("../../errorHandler/ApiError"));
const commonFunction_1 = require("../../shared/commonFunction");
const createPost = (newPost) => __awaiter(void 0, void 0, void 0, function* () {
    if (!newPost.subcat_id || !newPost.cat_id) {
        throw new ApiError_1.default(404, "subcat and cat must be selected");
    }
    const result = yield posts_model_1.PostModel.create(newPost);
    return result;
});
const getAllPost = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page = "1", limit = "10", sortBy, sortOrder } = queryData;
    const pagination = (0, commonFunction_1.calcSkip)(page, limit);
    //searching
    let query = {};
    if (queryData.cat_id) {
        query.cat_id = queryData.cat_id;
    }
    if (queryData.subcat_id) {
        query.subcat_id = queryData.subcat_id;
    }
    const sortCondition = {};
    if (sortBy) {
        sortCondition[sortBy] = (_a = sortOrder) !== null && _a !== void 0 ? _a : "asc";
    }
    const result = yield posts_model_1.PostModel.find(query)
        .sort(sortCondition)
        .skip(pagination.skip)
        .limit(pagination.limit);
    const total = yield posts_model_1.PostModel.countDocuments(query);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            count: total,
        },
        data: result,
    };
});
const getSinglePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_model_1.PostModel.findById({ _id: id });
    return result;
});
const updatePost = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield posts_model_1.PostModel.findById({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Post not found !");
    }
    if (data.title) {
        const Post = yield posts_model_1.PostModel.findOne({
            title: data.title,
        });
        if (Post) {
            throw new ApiError_1.default(409, "same seller same named Post is not allowed twice");
        }
    }
    const result = yield posts_model_1.PostModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const deletePost = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_model_1.PostModel.findByIdAndDelete({ _id: id });
    return result;
});
exports.PostService = {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost,
};
