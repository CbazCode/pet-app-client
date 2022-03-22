import { useMutation } from "react-query";

import { loginUser, registerUser } from "./user.service";
import { User } from "./user.service.types";

export const useRegisterUser = () => {
  return useMutation((user: User) => registerUser(user));
};

export const useLoginUser = () => {
  return useMutation((user: User) => loginUser(user));
};
