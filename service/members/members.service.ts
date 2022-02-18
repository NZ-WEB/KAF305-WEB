import axios from 'axios';
import { SERVER_BASE_URL } from '../../utils/constants';
import { MembersInterface } from '../../interfaces/members.interface';
import { FieldValues, UnpackNestedValue } from 'react-hook-form';

export default class MembersService {
  async getAll() {
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/members`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.members;
    } catch (error: any) {
      throw error.response;
    }
  }

  async getBySlug(slug: string) {
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/members/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.members;
    } catch (e) {
      throw e.response;
    }
  }

  async create(data: MembersInterface) {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;

      const body = JSON.stringify({
        members: data,
      });

      const response = await axios.post(`${SERVER_BASE_URL}/members`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      console.log(response, 'member list response');

      return response;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }

  async delete(slug: string) {
    const token = JSON.parse(localStorage.getItem('user')).token;
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/members/${slug}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(response, 'deleted');

      return response;
    } catch (error) {
      throw error.response;
    }
  }

  async update(data: UnpackNestedValue<FieldValues>, slug: string) {
    const token = JSON.parse(localStorage.getItem('user')).token;
    try {
      const response = await axios.put(
        `${SERVER_BASE_URL}/members/${slug}`,
        JSON.stringify({ members: data }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(response.data.members, 'res');
      return response.data.members;
    } catch (e) {
      throw e.response;
    }
  }
}
