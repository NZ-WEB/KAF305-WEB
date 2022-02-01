import { PublicationInterface } from '../../interfaces/publication.interface';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../utils/constants';

export default class PublicationsService {
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
}
