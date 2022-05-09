import axios from 'axios';
import { UserInfo, UserLocalStorage } from '../interfaces';
import APIHelper from './API-helper';
import authHeader from './auth-header';

const API_PREFIX: string = APIHelper.GetAPIPrefix();
const USER_URL: string = '/api/test';

class UserService {
  private USER_URL: string = API_PREFIX + '/api/user';
  public getPublicContent() {
    return axios.get(USER_URL + '/all');
  }
  public getUserBoard() {
    return axios.get(USER_URL + '/user', { headers: authHeader() });
  }
  public getModeratorBoard() {
    return axios.get(USER_URL + '/mod', { headers: authHeader() });
  }
  public getAdminBoard() {
    return axios.get(USER_URL + '/admin', { headers: authHeader() });
  }

  public updateUserInfo = async (userInfo: { user: UserInfo }) => {
    const url: string = this.USER_URL + '/update';
    console.log(`${this.updateUserInfo.name} response`);
    try {
      const response = await axios.put(url, userInfo);

      console.log('response ', response.data);

      if (response.data.result && response.data.result.length >= 1) {
        const user: UserLocalStorage = JSON.parse(localStorage.getItem('user'));

        user.info.about = userInfo.user.about;

        localStorage.setItem('user', JSON.stringify(user));
      }

      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  public getFriends = async (userId: number) => {
    const url: string = this.USER_URL + '/get-friends';

    const payload = {
      user: {
        id: userId,
      },
    };

    try {
      const response = await axios.post(url, payload);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  public getFollower = async (userId: number) => {
    const url: string = this.USER_URL + '/get-follower';

    const payload = {
      user: {
        id: userId,
      },
    };
    try {
      const response = await axios.post(url, payload);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  public getFollowing = async (userId: number) => {
    const url: string = this.USER_URL + '/get-following';

    const payload = {
      user: {
        id: userId,
      },
    };
    try {
      const response = await axios.post(url, payload);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
}

export default new UserService();
