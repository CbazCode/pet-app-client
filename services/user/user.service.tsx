// User services

import { User } from "./user.service.types";
// Utils
import axios from "../../utils/axios.utils";

const baseUrl = "/users";

export const registerUser = async (user: User) => {
  try {
    console.log({ user });
    const { data } = await axios.post(`${baseUrl}/signUp`, user);
    console.log({ data });
    return data;
  } catch (error: any) {
    const { response } = error;
    const { data } = response;
    const { error: serverError } = data;

    throw new Error(serverError.message);
  }
};

export const loginUser = async (user: User) => {
  try {
    const { data } = await axios.post(`${baseUrl}/signIn`, user);
    console.log({ data });
    return data;
  } catch (error: any) {
    const { response } = error;
    const { data } = response;
    const { error: serverError } = data;

    throw new Error(serverError.message);
  }
};
