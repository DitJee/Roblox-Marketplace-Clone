import pool from "../dbconfig/dbconnector";
import { GameInfo } from "../interfaces";

class GameCategoryPreCheck {
  private TABLE_NAME: string = "game_category";

  public checkDuplicateGameCategory = async (req, res, next) => {
    const client = await pool.connect();

    let bHasDuplicate: boolean = false;

    try {
      await Promise.all(
        req.body.categories.map(async (category) => {
          const _category: string = category.category;

          const sql = `SELECT category FROM ${this.TABLE_NAME} WHERE category = ($1)`;

          try {
            const { rows } = await client.query(sql, [_category]);

            if (rows.length > 0) {
              bHasDuplicate = true;
            }
          } catch (error) {
            console.log("error occured", error);
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
        message: "error occured",
        err: err,
      });
      return;
    }
  };
}

export default GameCategoryPreCheck;
