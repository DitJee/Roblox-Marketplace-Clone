const authHeader = () => {
  const userStr = localStorage.getItem('user');

  let user = userStr ? JSON.parse(userStr) : null;

  return user && user.accessToken
    ? {
        Authorization: 'Bearer ' + user.accessToken,
      }
    : {};
};

export default authHeader;
