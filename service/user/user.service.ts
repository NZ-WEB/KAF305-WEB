import axios from 'axios';
import { SERVER_BASE_URL } from '../../utils/constants';

export interface ILoginData {
  email: string;
  password: string;
}

export default class UserService {
  async login(loginData: ILoginData) {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users/login`,
        JSON.stringify({ user: loginData }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async register(loginData: ILoginData) {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users`,
        JSON.stringify({ user: loginData }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error: any) {
      throw error.response.data;
    }
  }
}
