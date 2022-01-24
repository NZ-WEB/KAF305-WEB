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
}