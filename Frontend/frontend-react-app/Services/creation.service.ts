import axios from 'axios';
import { UserInfo, UserLocalStorage } from '../interfaces';
import APIHelper from './API-helper';

const API_PREFIX: string = APIHelper.GetAPIPrefix();

class CreationService {
  private Creation_URL: string = API_PREFIX + '/api/creation';

  public getCreationById = async (payload) => {
    const url: string = this.Creation_URL + '/get/creation';

    try {
      let response = await axios.get(url, payload);

      return response.data;
    } catch (err) {
      return null;
    }
  };

  public getCreationByUserId = async (payload) => {
    const url: string = this.Creation_URL + '/get/user';

    try {
      let response = await axios.get(url, payload);

      return response.data;
    } catch (err) {
      return null;
    }
  };

  public getUserByCreationId = async (payload) => {
    const url: string = this.Creation_URL + '/get-user';

    try {
      let response = await axios.get(url, payload);

      return response.data;
    } catch (err) {
      return null;
    }
  };

  // TODO: add type to the payload
  public addCreation = async (payload) => {
    const url: string = this.Creation_URL + '/add';

    try {
      let response = await axios.post(url, payload);

      return response.data;
    } catch (err) {
      return null;
    }
  };

  // TODO: add type to the payload
  public updateCreationInfo = async (payload) => {
    const url: string = this.Creation_URL + '/update';

    try {
      let response = await axios.put(url, payload);

      if (response.data.result && response.data.result.length >= 1) {
        // TODO: update the creation cards
      }

      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // TODO: add type to the payload
  public deleteCreation = async (payload) => {
    const url: string = this.Creation_URL + '/delete';

    try {
      let response = await axios.put(url, payload);

      if (response.data.result && response.data.result >= 1) {
        // TODO: update the creation cards
      }

      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
}
