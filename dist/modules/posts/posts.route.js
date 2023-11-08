"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const posts_validation_1 = require("./posts.validation");
const posts_controller_1 = require("./posts.controller");
const router = express_1.default.Router();
router.post("/posts/create", (0, validateRequests_1.validateRequest)(posts_validation_1.PostsZodValidataion.createPost), posts_controller_1.PostsController.createPost);
router.get("/posts/:id", posts_controller_1.PostsController.getSinglePost);
router.post("/posts/delete", posts_controller_1.PostsController.deletePost);
router.patch("/posts/:id", (0, validateRequests_1.validateRequest)(posts_validation_1.PostsZodValidataion.updatePost), posts_controller_1.PostsController.updatePost);
router.get("/posts", posts_controller_1.PostsController.getAllPosts);
exports.PostRoutes = router;
