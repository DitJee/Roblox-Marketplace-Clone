import ModelHelper from "../helpers/model.helper";
import DB from "../models";

class CreationPreCheck {
  private creation;
  constructor() {
    const db = new DB();
    this.creation = db.creation.creation;
  }

  public checkIfCreationExist = async (req, res, next): Promise<void> => {
    try {
      const creation = await this.creation.findOne({
        where: {
          creationId: req.body.creation.creationId,
        },
      });

      if (creation) {
        next();
      } else {
        res.status(400).send({
          message: "creation does not exist",
        });
        return;
      }
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
      return;
    }
  };
}

export default CreationPreCheck;
