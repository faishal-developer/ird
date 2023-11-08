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
exports.SubCategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const subCategory_model_1 = require("./subCategory.model");
const ApiError_1 = __importDefault(require("../../errorHandler/ApiError"));
const commonFunction_1 = require("../../shared/commonFunction");
const category_model_1 = require("../category/category.model");
const createSubCategory = (newSubCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const SubCategory = yield subCategory_model_1.SubCategoryModel.findOne({
        title: newSubCategory.title,
    });
    if (SubCategory) {
        throw new ApiError_1.default(409, "Subcategory already exist");
    }
    const result = yield subCategory_model_1.SubCategoryModel.create(newSubCategory);
    yield category_model_1.CategoryModel.findOneAndUpdate({ _id: newSubCategory.cat_id }, { $push: { subcat_id: result._id } }, {
        new: true,
    });
    return result;
});
const getAllSubCategory = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page = "1", limit = "10", sortBy, sortOrder } = queryData;
    const pagination = (0, commonFunction_1.calcSkip)(page, limit);
    //searching
    let query = {};
    const sortCondition = {};
    if (sortBy) {
        sortCondition[sortBy] = (_a = sortOrder) !== null && _a !== void 0 ? _a : "asc";
    }
    const result = yield subCategory_model_1.SubCategoryModel.find(query)
        .sort(sortCondition)
        .skip(pagination.skip)
        .limit(pagination.limit);
    const total = yield subCategory_model_1.SubCategoryModel.countDocuments(query);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            count: total,
        },
        data: result,
    };
});
const getSingleSubCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subCategory_model_1.SubCategoryModel.findById({ _id: id });
    return result;
});
const updateSubCategory = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield subCategory_model_1.SubCategoryModel.findById({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "SubCategory not found !");
    }
    if (data.title) {
        const SubCategory = yield subCategory_model_1.SubCategoryModel.findOne({
            title: data.title,
        });
        if (SubCategory) {
            throw new ApiError_1.default(409, "same seller same named SubCategory is not allowed twice");
        }
    }
    const result = yield subCategory_model_1.SubCategoryModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const deleteSubCategory = ({ id, cat_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subCategory_model_1.SubCategoryModel.findByIdAndDelete({ _id: id });
    yield category_model_1.CategoryModel.findOneAndUpdate({ _id: cat_id }, { $pull: { posts: id } }, { new: true } // This option returns the updated document
    );
    return result;
});
exports.SubCategoryService = {
    createSubCategory,
    getAllSubCategory,
    getSingleSubCategory,
    updateSubCategory,
    deleteSubCategory,
};
