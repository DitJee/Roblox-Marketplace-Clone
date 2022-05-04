import express, { Router } from "express";
import User from "../controllers/user.controller";
import { AuthJwt } from "../middleware/index";
import Friend from "../middleware/verifyFriend";

const userRouter = Router();
const authJwt = new AuthJwt();
const userController = new User();
const friend = new Friend();
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
  [friend.checkIfAddSelf],
  userController.addFriend
);

userRouter.post(
  "/user/handle-friend-request",
  [friend.checkIfRequestExist],
  userController.handleFriendRequest
);
export default userRouter;
