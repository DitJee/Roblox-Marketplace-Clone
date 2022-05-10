import axios from 'axios';
import { CreationInfo, CreationPayload } from '../interfaces/index';
import { UserInfo, UserLocalStorage } from '../interfaces';
import APIHelper from './API-helper';

const API_PREFIX: string = APIHelper.GetAPIPrefix();

class CreationService {
  private Creation_URL: string = API_PREFIX + '/api/creation';

  public getCreationByUserId = async (userId: number) => {
    const url: string = this.Creation_URL + '/get/user';
    const payload = {
      user: {
        id: userId,
      },
    };
    try {
      let response = await axios.post(url, payload);

      return response.data;
    } catch (err) {
      return null;
    }
  };

  public getCreationById = async (userId: number, creationId: number) => {
    const url: string = this.Creation_URL + '/get/creation';

    const payload = {
      user: {
        id: userId,
      },
      creation: {
        id: creationId,
      },
    };

    try {
      let response = await axios.post(url, payload);

      return response.data;
    } catch (err) {
      return null;
    }
  };

  public getUserByCreationId = async (userId: number, creationId: number) => {
    const url: string = this.Creation_URL + '/get-user';

    const payload = {
      user: {
        id: userId,
      },
      creation: {
        id: creationId,
      },
    };

    try {
      let response = await axios.post(url, payload);

      return response.data;
    } catch (err) {
      return null;
    }
  };

  public addCreation = async (userId: number, creation: CreationInfo[]) => {
    const url: string = this.Creation_URL + '/add';

    const payload: CreationPayload = {
      user: {
        id: userId,
      },
      creations: creation,
    };

    try {
      let response = await axios.post(url, payload);

      return response.data;
    } catch (err) {
      return null;
    }
  };

  // TODO: find the page to use this service
  public updateCreationInfo = async (payload: CreationInfo) => {
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

  // TODO: find the page to use this service
  public deleteCreation = async (creationId: number) => {
    const url: string = this.Creation_URL + '/delete';

    const payload = {
      creation: {
        creationId: creationId,
      },
    };

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

export default new CreationService();
