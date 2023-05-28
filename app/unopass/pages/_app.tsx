import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Sidebar from "../components/sidebar/Sidebar.tsx";
import { extendTheme } from "@chakra-ui/react";
import Nav from "../components/nav/Nav";

const theme = extendTheme({
	fonts: {
		heading: `'Montserrat', sans-serif`,
		body: `'Montserrat', sans-serif`,
	},
 });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<ChakraProvider theme = {theme}>
				<Nav />
				<Component {...pageProps} />
			</ChakraProvider>
		</UserProvider>
	);
}
