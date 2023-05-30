import {
	Avatar,
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface TravelData {
	id: number;
	user_id: string;
	departure_time: Date;
	arrival_time: Date;
	flight_number: string;
	seat_number: string;
	gate_number: string;
	terminal: string;
	airline: string;
	row_number: string;
	created_at: Date;
	updated_at: Date;
	departure_time_formatted: string;
	arrival_time_formatted: string;
}

export async function getStaticProps() {
	// fetch the blog posts from the mock API
	const res = await fetch(
		"http://localhost:3000/api/travelData/getIndivTravelData"
	);
	const travelDataResponse = await res.json();
	const data: TravelData = travelDataResponse.data;

	return {
		props: { totalData: { data } }, // props will be passed to the page
	};
}

export default function CreateTokens({ totalData }: { totalData: TravelData }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	return (
		<>
			<Heading ml={130} mt={50} mb={50}>
				Information
			</Heading>
			<VStack>
				<Container
					maxW="md"
					alignItems={"center"}
					alignContent={"center"}
					bg={"whiteAlpha.200"}
					p={50}
					borderRadius={10}
				>
					<Stack gap={5}>
						<VStack gap={1} my={5}>
							<Avatar src={""} name="Dan Abrahmov" />
							<Heading size={"md"}>Nabil Ridhwan</Heading>
						</VStack>

						<Stack gap={1}>
							<Heading size={"md"}>Airline</Heading>
							<Text>AirAsia</Text>
						</Stack>

						<Stack gap={1}>
							<Heading size={"md"}>Departure Time</Heading>
							<Text>20/05/22 11pm SGT</Text>
						</Stack>

						<Stack gap={1}>
							<Heading size={"md"}>Arrival Time</Heading>
							<Text>20/05/22 3am SGT</Text>
						</Stack>

						<Stack gap={1}>
							<Heading size={"md"}>Flight No.</Heading>
							<Text>SQ117</Text>
						</Stack>
					</Stack>
				</Container>

				<Stack direction={"row"}>
					<Button variant="outline">Nope. Something seems off</Button>

					<Button variant="solid" onClick={onOpen}>
						Yes, This looks right
					</Button>
				</Stack>
			</VStack>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Confirm Master Password</ModalHeader>
					<ModalCloseButton />
					<ModalBody my={4}>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								router.push("/create_tokens/qr");
							}}
						>
							<Stack spacing={4}>
								<FormControl id="password">
									<FormLabel>Master Password</FormLabel>

									<Input type="password" />

									<Text
										color={"gray.400"}
										fontSize={"sm"}
										my={2}
									>
										Use your Master Password to generate a
										QR Code
									</Text>
								</FormControl>
								<Stack spacing={10}>
									<Button
										bg={"blue.400"}
										color={"white"}
										_hover={{
											bg: "blue.500",
										}}
										type="submit"
									>
										Generate
									</Button>
								</Stack>
							</Stack>
						</form>
					</ModalBody>

					{/* <ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant="ghost">Secondary Action</Button>
					</ModalFooter> */}
				</ModalContent>
			</Modal>
		</>
	);
}
