import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";

// Components
import Layout from "../components/global/Layout/Layout";
// Providers
import GlobalProvider from "../contexts/global/global.context";
import UserProvider from "../contexts/user/user.context";
// Theme
import theme from "../theme";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <UserProvider>
          <ChakraProvider resetCSS theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </UserProvider>
      </GlobalProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
