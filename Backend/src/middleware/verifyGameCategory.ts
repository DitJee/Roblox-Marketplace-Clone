import DB from "../models";
import { GameInfo } from "../interfaces";

class GameCategoryPreCheck {
  private gameCategory;
  constructor() {
    const db = new DB();
    this.gameCategory = db.gameCategory.gameCategory;
  }
  public checkDuplicateGameCategory = async (req, res, next) => {
    let bHasDuplicate: boolean = false;

    try {
      await Promise.all(
        req.body.categories.map(async (category) => {
          const _category: string = category.category;

          try {
            const addedCategory: string = await this.gameCategory.findOne({
              where: {
                category: _category,
              },
            });

            if (addedCategory) {
              bHasDuplicate = true;
            }
          } catch (error) {
            console.log("error occurred", error);
          }
        })
      );

      if (bHasDuplicate) {
        res.status(400).send({
          message: "Failed! Game category is already in use!",
        });
        return;
      } else {
        next();
      }
    } catch (err) {
      res.status(400).send({
        message: "error occurred",
        err: err,
      });
      return;
    }
  };
}

export default GameCategoryPreCheck;
