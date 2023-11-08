"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post("/categorys/create", (0, validateRequests_1.validateRequest)(category_validation_1.CategorysZodValidataion.createCategory), category_controller_1.CategorysController.createCategory);
router.get("/categorys/:id", category_controller_1.CategorysController.getSingleCategory);
router.delete("/categorys/:id", category_controller_1.CategorysController.deleteCategory);
router.patch("/categorys/:id", (0, validateRequests_1.validateRequest)(category_validation_1.CategorysZodValidataion.updateCategory), category_controller_1.CategorysController.updateCategory);
router.get("/categorys", category_controller_1.CategorysController.getAllCategorys);
exports.CategoryRoutes = router;
