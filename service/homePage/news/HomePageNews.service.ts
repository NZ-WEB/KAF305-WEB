import axios from 'axios';
import { SERVER_BASE_URL } from '../../../utils/constants';

export default class HomePageNewsService {
  async getAll() {
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/home-page/news/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.allTopNews;
    } catch (error: any) {
      throw error.response;
    }
  }
}
