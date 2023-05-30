import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Stack,
} from "@chakra-ui/react";
import { useQRCode } from "next-qrcode";

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

				<Alert status="success" w={600}>
					<AlertIcon />
					<AlertTitle>QR Code Generated</AlertTitle>
					<AlertDescription>
						Use this QR code to board your flight
					</AlertDescription>
				</Alert>

				{/* <Box borderRadius={5} bg="whiteAlpha.100" p={5}>
					<Text>
						This QR Code can be used by the user to redeem their
						token
					</Text>
				</Box> */}
			</Stack>
		</>
	);
}
