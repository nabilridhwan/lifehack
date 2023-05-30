import { useUser } from "@auth0/nextjs-auth0/client";
import {
	Box,
	Button,
	Flex,
	HStack,
	Heading,
	Link,
	Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export const links = [
	{
		id: 1,
		link: "/",
		name: "Home",
	},
	{ id: 2, link: "/manage_tokens", name: "Manage Tokens" },
	// {
	// 	id: 3,
	// 	link: "/create_tokens",
	// 	name: "Create Tokens",
	// },
	// {
	// 	id: 4,
	// 	link: "/scan_tokens",
	// 	name: "Scan Tokens",
	// },
];

const Nav = () => {
	const router = useRouter();
	const { user } = useUser();

	return (
		<Flex
			w="full"
			alignItems="center"
			minHeight={"10vh"}
			padding={{ base: "30px", md: "30px 70px" }}
			justifyContent="space-between"
		>
			<Box>
				<Heading
					as="h2"
					size="md"
					onClick={() => {
						router.push("/");
					}}
				>
					UNOPASS
				</Heading>
			</Box>

			<Spacer />

			<HStack
				spacing="30px"
				display={{ base: "none", lg: "inline-block" }}
			>
				{links.map((li) => (
					<Link
						href={li.link}
						opacity={0.7}
						fontWeight="semibold"
						key={li.id}
					>
						{li.name}
					</Link>
				))}
			</HStack>

			<Spacer />

			{user ? (
				<Button
					onClick={() => {
						router.push("/api/auth/logout");
					}}
				>
					Log Out
				</Button>
			) : (
				<Button
					onClick={() => {
						router.push("/api/auth/login");
					}}
				>
					Log In
				</Button>
			)}
		</Flex>
	);
};

export default Nav;
