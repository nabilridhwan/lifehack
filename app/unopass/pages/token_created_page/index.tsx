import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import { useQRCode } from "next-qrcode";
import { BiPaperPlane } from "react-icons/bi";

export default function TokenCreatedPage() {
	const { Canvas } = useQRCode();

	return (
		<>
			<Stack alignItems={"center"}>
				<Box borderRadius={20} bg="white" m={20}>
					<Canvas
						text={"https://github.com/bunlong/next-qrcode"}
						options={{
							level: "M",
							margin: 3,
							scale: 4,
							width: 200,
							color: {
								dark: "#000",
								light: "#FFF",
							},
						}}
					/>
				</Box>
				<Box borderRadius={5} bg="whiteAlpha.100" p={5}>
					<Stack>
						<Stack
							direction={"row"}
							alignItems={"center"}
							textColor={"gray.400"}
						>
							<Icon
								w={8}
								h={8}
								alignItems={"center"}
								justifyContent={"center"}
							>
								<BiPaperPlane />
							</Icon>

							<Text>Airline</Text>
						</Stack>
						<Text>
							This QR Code can be used by the user to redeem their
							token
						</Text>
					</Stack>
				</Box>

				<Box borderRadius={5} bg="whiteAlpha.100" p={5}>
					<Text>
						This QR Code can be used by the user to redeem their
						token
					</Text>
				</Box>
			</Stack>
		</>
	);
}
