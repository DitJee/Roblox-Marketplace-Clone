import { GameInfo } from "../../interfaces";
import DB from "../../models";
class GameController {
  private game;
  private gameCategory;
  private Op;

  constructor() {
    const db = new DB();
    this.game = db.game.game;
    this.gameCategory = db.gameCategory.gameCategory;
    this.Op = db.Sequelize.Op;
  }

  public getAllGames = async (req, res) => {
    try {
      const games = await this.game.findAll();
      res.send(games);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };

  public insertGame = async (req, res) => {
    try {
      let addedRows: GameInfo[] = [];

      if (req.body.games) {
        await Promise.all(
          req.body.games.map(async (game) => {
            const { thumbnail, name, likePercentage, viewCount, category } =
              game;

            const addedGame = await this.game.create({
              thumbnail: thumbnail,
              name: name,
              likePercentage: likePercentage,
              viewCount: viewCount,
            });
            console.log(addedGame);

            addedRows.push(addedGame);

            const categories = await this.gameCategory.findAll({
              where: {
                id: category,
              },
            });

            console.log(categories);

            await addedGame.setGameCategories(categories);
          })
        );

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
