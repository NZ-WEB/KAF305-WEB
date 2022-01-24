import axios, {AxiosResponse} from "axios";
import {SERVER_BASE_URL} from "../../utils/constants";

export default class MembersService {
    async getAll(): Promise<AxiosResponse> {
        try {
            const response = await axios.get(
                `${SERVER_BASE_URL}/members`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.members;
        } catch (error: any) {
            throw error.response;
        }
    }

    async getBySlug(slug: string): Promise<AxiosResponse> {
        try {
            const response = await axios.get(
                `${SERVER_BASE_URL}/members/${slug}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.members;
        } catch (e) {
            throw error.response;
        }
    }

    async create(data: Object): Promise<AxiosResponse> {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;

            const body = JSON.stringify({
                members: data
            })

            const response = await axios.post(
                `${SERVER_BASE_URL}/members`,
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    },
                }
            );
            console.log(response, 'member list response');

            return response;
        } catch (error) {
            throw error.response;
        }
    }

    async delete(slug: string): Promise<AxiosResponse> {
        const token = JSON.parse(localStorage.getItem('user')).token;
        try {
            const response = await axios.delete(
                `${SERVER_BASE_URL}/members/${slug}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    },
                }
            );
            console.log(response, 'deleted');

            return response;
        } catch (error) {
            throw error.response;
        }
    }

    async update(data: Object, slug: string): Promise<AxiosResponse> {
        const token = JSON.parse(localStorage.getItem('user')).token;
        try {
            const response = await axios.put(
                `${SERVER_BASE_URL}/members/${slug}`,
                JSON.stringify({members: data}),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    },
                }
            );
            console.log(response.data.members,'res')
            return response.data.members;
        } catch (e) {
            console.log(e,'error response')
            throw error.response;
        }
    }
}