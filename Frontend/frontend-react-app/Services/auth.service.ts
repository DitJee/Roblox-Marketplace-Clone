import axios from 'axios';
import 'dotenv/config';
import APIHelper from './API-helper';

const API_PREFIX: string = APIHelper.GetAPIPrefix();

const AUTH_URL: string = '/api/auth';

class AuthService {
  private API_URL: string = API_PREFIX + AUTH_URL;

  public login = async (username: string, password: string) => {
    const url: string = this.API_URL + '/signin';
    try {
      const response = await axios.post(url, {
        username,
        password,
      });

      console.log('response', response);
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };

  public logout = (): void => {
    localStorage.removeItem('user');
  };

  public register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const url: string = this.API_URL + '/signup';
    const response = await axios.post(url, {
      username,
      email,
      password,
    });
  };

  public getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };
}

export default new AuthService();
