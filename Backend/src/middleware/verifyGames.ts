import { GameInfo } from "../interfaces";
import DB from "../models";

class GamePreCheck {
  private game;
  constructor() {
    const db = new DB();
    this.game = db.game.game;
  }

  public checkDuplicateGameName = async (req, res, next) => {
    let bHasDuplicate: boolean = false;
    try {
      await Promise.all(
        req.body.games.map(async (game) => {
          const gameName: string = game.name;

          try {
            const game: string = await this.game.findOne({
              where: {
                name: gameName,
              },
            });

            if (game) {
              bHasDuplicate = true;
            }
          } catch (error) {
            console.log("error occurred", error);
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
      console.log(err);
      res.status(400).send({
        message: "middleware error occured",
        err: err,
      });
      return;
    }
  };
}

export default GamePreCheck;
