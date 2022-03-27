// Pet services

import useUser from "../../contexts/user/user.hooks";
import axios from "../../utils/axios.utils";
import { Pet } from "./pet.service.types";

const baseUrl = "/pets";

export const fetchPets = async (): Promise<Pet[]> => {
  try {
    const { data } = await axios.get(`${baseUrl}`);
    return data.result;
  } catch (error: any) {
    const { response } = error;
    const { data } = response;
    const { error: serverError } = data;
    throw new Error(serverError.message);
  }
};

export const fetchPet = async (name: string): Promise<Pet[]> => {
  try {
    const { data } = await axios.get(`${baseUrl}/${name}`);
    return data.result;
  } catch (error: any) {
    const { response } = error;
    const { data } = response;
    const { error: serverError } = data;
    throw new Error(serverError.message);
  }
};

export const createPet = async (petAndToken: any) => {
  const { pet, token } = petAndToken;
  try {
    const { data } = await axios.post(`${baseUrl}`, pet, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error: any) {
    const { response } = error;
    const { data } = response;
    const { error: serverError } = data;
    throw new Error(serverError.message);
  }
};
