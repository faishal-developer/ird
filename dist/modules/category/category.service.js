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
exports.CategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const category_model_1 = require("./category.model");
const ApiError_1 = __importDefault(require("../../errorHandler/ApiError"));
const commonFunction_1 = require("../../shared/commonFunction");
const category_constant_1 = require("./category.constant");
const createCategory = (newCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const Category = yield category_model_1.CategoryModel.findOne({ title: newCategory.title });
    if (Category) {
        throw new ApiError_1.default(409, "Category allready exist");
    }
    const result = yield category_model_1.CategoryModel.create(newCategory);
    return result;
});
const getAllCategory = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page = "1", limit = "10", sortBy, sortOrder, searchTerm } = queryData;
    const pagination = (0, commonFunction_1.calcSkip)(page, limit);
    //searching
    let query = {};
    //searchTerm
    if (searchTerm) {
        query["$or"] = category_constant_1.CategorySearchableFields.map((field) => ({
            [field]: {
                $regex: searchTerm,
                $options: "i",
            },
        }));
    }
    const sortCondition = {};
    if (sortBy) {
        sortCondition[sortBy] = (_a = sortOrder) !== null && _a !== void 0 ? _a : "asc";
    }
    const result = yield category_model_1.CategoryModel.find(query)
        .sort(sortCondition)
        .skip(pagination.skip)
        .limit(pagination.limit);
    const total = yield category_model_1.CategoryModel.countDocuments(query);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            count: total,
        },
        data: result,
    };
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.CategoryModel.findById({ _id: id });
    return result;
});
const updateCategory = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.CategoryModel.findById({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category not found !");
    }
    if (data.title) {
        const Category = yield category_model_1.CategoryModel.findOne({
            title: data.title,
        });
        if (Category) {
            throw new ApiError_1.default(409, "same seller same named Category is not allowed twice");
        }
    }
    const result = yield category_model_1.CategoryModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.CategoryModel.findByIdAndDelete({ _id: id });
    return result;
});
exports.CategoryService = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
