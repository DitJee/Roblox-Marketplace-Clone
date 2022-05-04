import express, { Router } from "express";
import User from "../controllers/user.controller";
import { AuthJwt } from "../middleware/index";
import FriendPreCheck from "../middleware/verifyFriend";
import UserPreCheck from "../middleware/verifyuser";

const userRouter = Router();
const authJwt = new AuthJwt();
const userController = new User();
const friendPreCheck = new FriendPreCheck();
const userPreCheck = new UserPreCheck();
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
  [friendPreCheck.checkIfAddSelf],
  userController.addFriend
);

userRouter.post(
  "/user/handle-friend-request",
  [friendPreCheck.checkIfRequestExist],
  userController.handleFriendRequest
);

userRouter.get(
  "/user/get-friends",
  [userPreCheck.checkIfUserExist],
  userController.getAllFriends
);

userRouter.delete(
  "/user/delete-friend",
  [friendPreCheck.checkIfIsFriend],
  userController.deleteFriend
);

userRouter.put(
  "/user/update",
  [userPreCheck.checkIfUserExist],
  userController.updateUserInfo
);
export default userRouter;
