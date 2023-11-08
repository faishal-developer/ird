import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { CategorysZodValidataion } from "./category.validation";
import { CategorysController } from "./category.controller";

const router = express.Router();

router.post(
  "/categorys/create",
  validateRequest(CategorysZodValidataion.createCategory),
  CategorysController.createCategory
);

router.get("/categorys/:id", CategorysController.getSingleCategory);
router.delete("/categorys/:id", CategorysController.deleteCategory);
router.patch(
  "/categorys/:id",
  validateRequest(CategorysZodValidataion.updateCategory),
  CategorysController.updateCategory
);

router.post("/categorys", CategorysController.getAllCategorys);

export const CategoryRoutes = router;
