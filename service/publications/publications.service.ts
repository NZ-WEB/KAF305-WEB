import axios, { AxiosResponse } from 'axios';
import { SERVER_BASE_URL } from '../../utils/constants';
import { PublicationInterface } from '../../interfaces/publication.interface';

export default class PublicationsService {
  async create(
    data: PublicationInterface,
    authorId: number,
  ): Promise<AxiosResponse> {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;

      const body = JSON.stringify({
        publication: { ...data, authorId },
      });

      const response = await axios.post(
        `${SERVER_BASE_URL}/publications`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(response, 'publication created response');

      return response;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async update(body, slug: string) {
    const token = JSON.parse(localStorage.getItem('user')).token;
    try {
      const response = await axios.put(
        `${SERVER_BASE_URL}/publications/${slug}`,
        JSON.stringify({ publication: body }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      return response.data.publications;
    } catch (e) {
      throw e.response.data;
    }
  }

  async delete(slug: string): Promise<AxiosResponse> {
    const token = JSON.parse(localStorage.getItem('user')).token;
    try {
      return await axios.delete(`${SERVER_BASE_URL}/publications/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
    } catch (error) {
      throw error.response;
    }
  }
}
