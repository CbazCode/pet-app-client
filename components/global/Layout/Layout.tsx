import { useRouter } from "next/router";
import React, { useEffect } from "react";

// Contexts
import useGlobal from "../../../contexts/global/global.hooks";
import useUser from "../../../contexts/user/user.hooks";
// Types
import { LayoutProps as Props } from "./Layout.types";

const Layout: React.FC<Props> = props => {
  const { children } = props;

  const router = useRouter();
  const { pathname } = router;
  const { loading } = useGlobal();
  const { setAuthInfo, authInfo } = useUser();

  useEffect(() => {
    const authInfo = localStorage.getItem("authInfo");
    const isLoginOrRegister = pathname === "/" || pathname === "/register";

    if (!authInfo && !isLoginOrRegister) {
      router.push("/");
      return;
    }
    if (authInfo && !isLoginOrRegister) {
      if (!authInfo) setAuthInfo(JSON.parse(authInfo));
      return;
    }
    if (authInfo && isLoginOrRegister) {
      router.push("/petsHome");
      return;
    }
  }, [setAuthInfo]);
  return (
    <div className="Layout">
      {children} {loading ? <p>Loading...</p> : null}
    </div>
  );
};

Layout.defaultProps = {};

export default Layout;
