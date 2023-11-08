import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { SubCategorysZodValidataion } from "./subCategory.validation";
import { SubCategorysController } from "./subCategory.controller";

const router = express.Router();

router.post(
  "/sub-categorys/create",
  validateRequest(SubCategorysZodValidataion.createSubCategory),
  SubCategorysController.createSubCategory
);

router.get("/sub-categorys/:id", SubCategorysController.getSingleSubCategory);
router.post("/sub-categorys/delete", SubCategorysController.deleteSubCategory);
router.patch(
  "/sub-categorys/:id",
  validateRequest(SubCategorysZodValidataion.updateSubCategory),
  SubCategorysController.updateSubCategory
);

router.get("/sub-categorys", SubCategorysController.getAllSubCategorys);

export const SubCategoryRoutes = router;
