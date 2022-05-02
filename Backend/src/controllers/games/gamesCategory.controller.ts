import DB from "../../models";

class GameCategoryController {
  private gameCategory;
  private Op;

  constructor() {
    const db = new DB();
    this.gameCategory = db.gameCategory.gameCategory;
    this.Op = db.Sequelize.Op;
  }

  public getAllRows = async (req, res) => {
    try {
      const categories = await this.gameCategory.findAll();

      res.send(categories);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };

  public insertGameCategory = async (req, res) => {
    try {
      let addedCategories: { id: number; addedCategory: string }[] = [];

      if (req.body.categories) {
        await Promise.all(
          req.body.categories.map(async (_category) => {
            const category: string = _category.category;
            const id: number = (await this.gameCategory.count()) + 1;
            console.log(id);
            const addedCategory = await this.gameCategory.create({
              id: id,
              category: category,
            });

            console.log(addedCategory);

            addedCategories.push(addedCategory);
          })
        );

        res.send(addedCategories);
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
