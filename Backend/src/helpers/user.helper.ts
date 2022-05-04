class UserHelper {
  public static getUserById = async (user, userId: number) => {
    try {
      const _user = await user.findOne({
        where: {
          id: userId,
        },
      });

      return _user;
    } catch (err) {
      return null;
    }
  };
}

export default UserHelper;
