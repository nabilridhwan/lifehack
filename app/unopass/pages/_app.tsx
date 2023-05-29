import Nav from "@/components/nav/Nav";
import { useIfUserNeedsOnboard } from "@/query/user.query";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

const queryClient = new QueryClient();

function OnboardProvider({ children }: { children: ReactNode }) {
	const { user } = useUser();
	const router = useRouter();

	const { mutateAsync, error, data } = useIfUserNeedsOnboard(
		user?.email || ""
	);

	useEffect(() => {
		if (!user) return;

		if (user && !error && user.email) {
			mutateAsync({
				email: user.email,
			});
		}
	}, [user]);

	if (data && data.error) {
		router.replace("/onboard");
	}

	return <>{children}</>;
}

const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<OnboardProvider>
					<ChakraProvider>
						<Nav />
						<Component {...pageProps} />
					</ChakraProvider>
				</OnboardProvider>
			</UserProvider>
		</QueryClientProvider>
	);
}
