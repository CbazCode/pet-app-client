// Helpers of login component

// Types
import { UserResponse } from "../../services/user/user.service.types";

export const createAuthInfoPayload = (data: UserResponse) => {
  const { result, token } = data;
  const { _id, email, name, password } = result;

  const authInfoPayload = {
    user: {
      id: _id,
      name,
      email
    },
    token
  };

  return authInfoPayload;
};
