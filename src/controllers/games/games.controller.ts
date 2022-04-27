import pool from "../../dbconfig/dbconnector";
import { GameInfo } from "../../interfaces";

class GameController {
  private TABLE_NAME: string = "games";
  private ALL_COLUMNS_NAME: string = `("thumbnail", "name","likePercentage","viewCount", "category")`;

  public getAllRows = async (req, res) => {
    try {
      const client = await pool.connect();

      const sql = `SELECT * FROM ${this.TABLE_NAME}`;
      const { rows } = await client.query(sql);
      client.release();

      res.send(rows);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };

  public insertGame = async (req, res) => {
    try {
      let addedRows: GameInfo[] = [];

      const client = await pool.connect();

      const sql = `INSERT INTO ${this.TABLE_NAME} ${this.ALL_COLUMNS_NAME} VALUES ($1, $2, $3, $4, $5) RETURNING *`;

      if (req.body.games) {
        await Promise.all(
          req.body.games.map(async (game) => {
            const thumbnail: string = game.thumbnail;
            const name: string = game.name;
            const likePercentage: number = game.likePercentage;
            const viewCount: number = game.viewCount;
            const category: string = game.category;

            const { rows } = await client.query(sql, [
              thumbnail,
              name,
              likePercentage,
              viewCount,
              category,
            ]);

            console.log(rows[0]);

            addedRows.push(rows[0]);
          })
        );

        client.release();

        res.status(200).send({
          message: "Games have been added",
          games: addedRows,
        });
      } else {
        res.status(400).send({
          message: "The array of game's information is not sent",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };
}

export default GameController;
