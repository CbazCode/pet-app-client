import React, { createContext, useMemo, useState } from "react";

import { GlobalProviderProps as Props } from "./global.context.types";
import { GlobalProviderValue } from "./global.context.types";

// @ts-ignore
export const GlobalContext = createContext<GlobalProviderValue>();

const GlobalProvider: React.FC<Props> = props => {
  const [loading, setLoading] = useState(false);
  const value: GlobalProviderValue = useMemo(() => {
    return { loading, setLoading };
  }, [loading]);

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
