import express, { Router } from "express";
import Creation from "../controllers/creation.controller";
import User from "../controllers/user.controller";
import { AuthJwt } from "../middleware/index";
import CreationPreCheck from "../middleware/verifyCreation";
import FriendPreCheck from "../middleware/verifyFriend";
import UserPreCheck from "../middleware/verifyuser";

const creationRouter = Router();
const authJwt = new AuthJwt();
const creationController = new Creation();
const friendPreCheck = new FriendPreCheck();
const userPreCheck = new UserPreCheck();
const creationPreCheck = new CreationPreCheck();

creationRouter.post(
  "/creation/get/creation",
  [userPreCheck.checkIfUserExist],
  creationController.getCreationById
);

creationRouter.post(
  "/creation/get/user",
  [userPreCheck.checkIfUserExist],
  creationController.getCreationByUserId
);

creationRouter.post(
  "/creation/get-user",
  creationController.getUserByCreationId
);

creationRouter.post(
  "/creation/add",
  [userPreCheck.checkIfUserExist],
  creationController.addCreation
);

creationRouter.put(
  "/creation/update",
  [creationPreCheck.checkIfCreationExist],
  creationController.updateCreationInfo
);

creationRouter.delete(
  "/creation/delete",
  [creationPreCheck.checkIfCreationExist],
  creationController.deleteCreation
);

export default creationRouter;
