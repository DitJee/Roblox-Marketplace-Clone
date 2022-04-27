import pool from "../../dbconfig/dbconnector";

class TestController {
  public TABLE_NAME: string = "todos";
  public ALL_COLUMNS_NAME: string;

  public get = async (req, res) => {
    console.log(this.TABLE_NAME);
    try {
      const client = await pool.connect();

      const sql = `SELECT * FROM ${this.TABLE_NAME}`;
      const { rows } = await client.query(sql);

      const todos = rows;

      client.release();

      res.send(todos);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };
}

export default TestController;
