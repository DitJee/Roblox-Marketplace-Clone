import UrlHelper from '../endpoint.config';

class APIHelper {
  public static GetAPIPrefix() {
    return UrlHelper.GetEnv() === 'DEV'
      ? 'http://localhost:' + UrlHelper.GetPort().Node
      : 'http://Roblock' + UrlHelper.GetPort().Node;
  }
}

export default APIHelper;
