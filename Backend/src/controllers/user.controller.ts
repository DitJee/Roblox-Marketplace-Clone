class User {
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
}

export default User;
