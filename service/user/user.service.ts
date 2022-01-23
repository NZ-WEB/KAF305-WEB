import axios, {AxiosResponse} from "axios";
import {SERVER_BASE_URL} from "../../utils/constants";
import {ErrorInfo} from "react";

export interface ILoginData {
    email: string;
    password: string;
}

export default class UserService {
    async login(loginData: ILoginData): Promise<AxiosResponse> {
        try {
            const response = await axios.post(
                `${SERVER_BASE_URL}/users/login`,
                JSON.stringify({user: loginData}),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            localStorage.setItem("user", response.data.user);
            return response.data.user;
        } catch (error: any) {
            throw error.response.data;
        }
    }
}