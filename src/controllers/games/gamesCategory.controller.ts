import pool from "../../dbconfig/dbconnector";

class GameCategoryController {
  private TABLE_NAME: string;
  private ALL_COLUMNS_NAME: string;

  constructor() {
    this.TABLE_NAME = "game_category";
    this.ALL_COLUMNS_NAME = `("category")`;
  }

  public getAllRows = async (req, res) => {
    try {
      console.log(this.TABLE_NAME);
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

  public insertGameCategory = async (req, res) => {
    try {
      let addedRows: { id: number; addedCatergory: string }[] = [];
      const client = await pool.connect();

      const sql = `INSERT INTO ${this.TABLE_NAME} ${this.ALL_COLUMNS_NAME} VALUES ($1) RETURNING *`;
      if (req.body.categories) {
        await Promise.all(
          req.body.categories.map(async (_category) => {
            const category: string = _category.category;

            const { rows } = await client.query(sql, [category]);

            console.log(rows);

            addedRows.push(rows);
          })
        );

        client.release();

        res.send(addedRows);
      } else {
        res.status(400).send({
          message: "The array of game category information is not sent",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };
}

export default GameCategoryController;
