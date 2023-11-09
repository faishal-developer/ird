"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const subCategory_validation_1 = require("./subCategory.validation");
const subCategory_controller_1 = require("./subCategory.controller");
const router = express_1.default.Router();
router.post("/sub-categorys/create", (0, validateRequests_1.validateRequest)(subCategory_validation_1.SubCategorysZodValidataion.createSubCategory), subCategory_controller_1.SubCategorysController.createSubCategory);
router.get("/sub-categorys/:id", subCategory_controller_1.SubCategorysController.getSingleSubCategory);
router.delete("/sub-categorys/:id", subCategory_controller_1.SubCategorysController.deleteSubCategory);
router.patch("/sub-categorys/:id", (0, validateRequests_1.validateRequest)(subCategory_validation_1.SubCategorysZodValidataion.updateSubCategory), subCategory_controller_1.SubCategorysController.updateSubCategory);
router.post("/sub-categorys", subCategory_controller_1.SubCategorysController.getAllSubCategorys);
exports.SubCategoryRoutes = router;
