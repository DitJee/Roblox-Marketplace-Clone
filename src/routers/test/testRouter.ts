import express, { Router } from "express";
import TestController from "../../controllers/test/testController";

const testRouter = Router();
const testController = new TestController();

/* 
    test routes     
*/
testRouter.get("/test", testController.get);

export default testRouter;
