import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";

// Components
import Loading from "../Loading/Loading";
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
    const authInfoLocalStorage = localStorage.getItem("authInfo");
    const isLoginOrRegister = pathname === "/" || pathname === "/register";

    if (!authInfoLocalStorage && !isLoginOrRegister) {
      router.push("/");
      return;
    }
    if (authInfoLocalStorage && !isLoginOrRegister) {
      if (!!authInfo) setAuthInfo(JSON.parse(authInfoLocalStorage));
      return;
    }
    if (authInfoLocalStorage && isLoginOrRegister) {
      router.push("/petsHome");
      return;
    }
  }, [setAuthInfo]);
  return (
    <Box position="relative">
      {children} {loading ? <Loading /> : null}
    </Box>
  );
};

Layout.defaultProps = {};

export default Layout;
