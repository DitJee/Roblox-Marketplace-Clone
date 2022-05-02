import express, { Router } from "express";
import Authentication from "../controllers/auth.controller";
import SignUp from "../middleware/verifySignUp";

const authenticationRouter = Router();
const authentication = new Authentication();
const signup = new SignUp();

/* 
    Authentication routes     
*/
authenticationRouter.post(
  "/auth/signup",
  [signup.checkDuplicateUsernameOrEmail, signup.checkRolesExisted],
  authentication.signup
);

authenticationRouter.post("/auth/signin", authentication.signin);

export default authenticationRouter;
