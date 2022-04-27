import express, { Router } from "express";
import GameController from "../../controllers/games/games.controller";
import GameCategoryController from "../../controllers/games/gamesCategory.controller";
import GameCategoryPreCheck from "../../middleware/verifyGameCategory";
import GamePreCheck from "../../middleware/verifyGames";

const gameRouter = Router();
const gameController = new GameController();
const gameCategoryController = new GameCategoryController();
const gamePreCheck = new GamePreCheck();
const gameCategoryPreCheck = new GameCategoryPreCheck();
/* 
    Game routes     
*/
gameRouter.get("/games", gameController.getAllRows);
gameRouter.post(
  "/games/insert",
  [gamePreCheck.checkDuplicateGameName],
  gameController.insertGame
);

/* 
    Game category routes     
*/
gameRouter.get("/games/category", gameCategoryController.getAllRows);
gameRouter.post(
  "/games/category/insert",
  [gameCategoryPreCheck.checkDuplicateGameCategory],
  gameCategoryController.insertGameCategory
);

export default gameRouter;
