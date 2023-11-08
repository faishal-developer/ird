import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import { globalErrorHandler } from "./middleWares/globalErrorHandler";
import { CategoryRoutes } from "./modules/category/category.route";
import { SubCategoryRoutes } from "./modules/subCategory/subCategory.route";
import { PostRoutes } from "./modules/posts/posts.route";

const app: Application = express();
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Everything is working" });
});
app.use("/api/v1", CategoryRoutes);
app.use("/api/v1", SubCategoryRoutes);
app.use("/api/v1", PostRoutes);

//globalErrorhandler
app.use(globalErrorHandler);

//unknown route handler
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Api Not Found",
      },
    ],
  });
});

export default app;
