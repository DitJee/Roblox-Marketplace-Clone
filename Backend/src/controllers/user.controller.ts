import DB from "../models";

class User {
  private User;

  constructor() {
    const db = new DB();

    this.User = db.user.user;
  }

  public allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

  public userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };

  public adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };

  public moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  public addFriend = async (req, res) => {
    try {
      // get IDs
      const requesterId = req.body.requester.id;
      const requesteeId = req.body.requestee.id;

      // get both requester and requestee
      const requester = await this.User.findOne({
        where: {
          id: requesterId,
        },
      });

      // set new association
      const request = await requester.setRequestees(requesteeId);

      res.send({
        message: "User was registered successfully!",
        request: request,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default User;
