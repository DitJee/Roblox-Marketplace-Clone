import { error } from "console";
import ModelHelper from "../helpers/model.helper";
import DB from "../models";

class Creation {
  private creation;
  private user;

  constructor() {
    const db = new DB();

    this.user = db.user.user;
    this.creation = db.creation.creation;
  }

  public getCreationById = async (req, res) => {
    try {
      const creation = await this.creation.findOne({
        where: {
          creationId: req.body.creation.id,
        },
      });

      res.send({
        message: `Successfully get creation using id ${req.body.creation.id}`,
        result: creation,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public getCreationByUserId = async (req, res) => {
    try {
      const user = await this.user.findOne({
        where: {
          id: req.body.user.id,
        },
      });

      const creation = await user.getCreations();

      res.send({
        message: `Successfully get creation using id ${req.body.user.id}`,
        result: creation,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public getUserByCreationId = async (req, res) => {
    try {
      const creation = await this.creation.findOne({
        where: {
          creationId: req.body.creation.id,
        },
      });

      const owner = await creation.getOwner();

      res.send({
        message: `Successfully get the owner using id ${req.body.creation.id}`,
        result: owner,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public addCreation = async (req, res) => {
    try {
      if (req.body.creations) {
        const addedCreations = [];
        await Promise.all(
          req.body.creations.map(async (creation) => {
            try {
              const result = await this.creation.create(creation);
              addedCreations.push(result);
            } catch (error) {
              addedCreations.push(null);
            }
          })
        );

        res.send({
          message: `Successfully add creation/s to owner id ${req.body.user.id}`,
          result: addedCreations,
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public updateCreationInfo = async (req, res) => {
    try {
      const result = await this.creation.update(req.body.creation, {
        where: { creationId: req.body.creation.creationId },
      });

      res.send({
        message: "Creation info was successfully updated!",
        result: result,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public deleteCreation = async (req, res) => {
    try {
      const result = await this.creation.destroy({
        where: { creationId: req.body.creation.creationId },
      });

      res.send({
        message: "Creation was successfully destroyed!",
        result: result,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default Creation;
