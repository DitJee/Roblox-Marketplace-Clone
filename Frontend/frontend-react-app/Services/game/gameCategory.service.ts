import axios from 'axios';
import 'dotenv/config';
import { GameInfo } from '../../interfaces';
import APIHelper from '../API-helper';
import authHeader from '../auth-header';
const API_PREFIX: string = APIHelper.GetAPIPrefix();

const AUTH_URL: string = '/api/games/category';

class GameCategoryService {
  private API_URL: string = API_PREFIX + AUTH_URL;

  getAllGameCategories = async () => {
    const url: string = this.API_URL;

    try {
      let response = await axios.get(url);
      let data = response.data;
      return data;
    } catch (err) {
      throw new Error(err);
    }
  };
}
export default new GameCategoryService();
