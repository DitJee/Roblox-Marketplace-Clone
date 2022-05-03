import express, { Router } from "express";
import User from "../controllers/user.controller";
import { AuthJwt } from "../middleware/index";
import AddFriend from "../middleware/verifyAddFriend";

const userRouter = Router();
const authJwt = new AuthJwt();
const userController = new User();
const addFriend = new AddFriend();
/* 
    User routes     
*/
userRouter.get("/test/all", userController.allAccess);

userRouter.get("/test/user", [authJwt.verifyToken], userController.userBoard);
userRouter.get(
  "/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  userController.moderatorBoard
);
userRouter.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);

userRouter.post(
  "/user/add-friend",
  [addFriend.checkIfAddSelf],
  userController.addFriend
);

export default userRouter;
