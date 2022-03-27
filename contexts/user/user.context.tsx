import React, { createContext, useMemo, useState } from "react";

// Types
import { AuthInfo, UserProviderProps as Props } from "./user.context.types";
import { UserProviderValue } from "./user.context.types";

// @ts-ignore
export const UserContext = createContext<UserProviderValue>();

const UserProvider: React.FC<Props> = props => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({});
  const value: UserProviderValue = useMemo(() => {
    return { authInfo, setAuthInfo };
  }, [authInfo]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
