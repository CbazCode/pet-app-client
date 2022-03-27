// User service interfaces and types

export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface UserResponse {
  result: {
    _id: string;
    __v: number;
    password: string;
    name: string;
    email: string;
  };
  token: string;
}
