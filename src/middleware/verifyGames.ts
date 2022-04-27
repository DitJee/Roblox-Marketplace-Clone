import pool from "../dbconfig/dbconnector";
import { GameInfo } from "../interfaces";

class GamePreCheck {
  private TABLE_NAME: string = "games";

  public checkDuplicateGameName = async (req, res, next) => {
    const client = await pool.connect();

    let bHasDuplicate: boolean = false;
    try {
      await Promise.all(
        req.body.games.map(async (game) => {
          const gameName: string = game.name;

          const sql = `SELECT name FROM ${this.TABLE_NAME} WHERE name = ($1)`;

          try {
            const { rows } = await client.query(sql, [gameName]);

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
          message: "Failed! Game name is already in use!",
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

export default GamePreCheck;
