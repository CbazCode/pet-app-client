// Interfaces and types from context User

// Provider Props
export interface UserProviderProps {
  children: React.ReactNode;
}

// Provider value
export interface UserProviderValue {
  authInfo: AuthInfo;
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>;
}

export interface AuthInfo {
  token?: string;
  user?: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
