import { SERVER_BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { NewsInterface } from '../../interfaces/News.interface';

export default class NewsService {
  async getAll() {
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/allNews/news`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.allNews;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }

  async create(data: NewsInterface) {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;

      const body = JSON.stringify({
        news: data,
      });

      const response = await axios.post(
        `${SERVER_BASE_URL}/allNews/news`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      return response.data.news;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }

  async deleteById(id: number) {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;

      const response = await axios.delete(
        `${SERVER_BASE_URL}/allNews/news/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
}
