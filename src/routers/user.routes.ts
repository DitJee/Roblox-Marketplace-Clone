import express, { Router } from "express";
import User from "../controllers/user.controller";
import { AuthJwt } from "../middleware/index";

const authorizationRouter = Router();
const authJwt = new AuthJwt();
const userController = new User();

/* 
    Authorization routes     
*/
authorizationRouter.get("/test/all", userController.allAccess);

authorizationRouter.get(
  "/test/user",
  [authJwt.verifyToken],
  userController.userBoard
);
authorizationRouter.get(
  "/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  userController.moderatorBoard
);
authorizationRouter.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);
export default authorizationRouter;
