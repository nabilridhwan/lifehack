"use client";

import { useCreateUserMutation } from "@/query/user.query";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Yup
import * as yup from "yup";

interface FormValues {
	masterPassword: string;
}

const initialData: FormValues = {
	masterPassword: "",
};

export default function SimpleCard() {
	const router = useRouter();

	const { user, isLoading } = useUser();

	const { values, handleSubmit, errors, setFieldValue } = useFormik({
		onSubmit: handleFormSubmit,
		initialValues: initialData,
		validationSchema: yup.object().shape({
			masterPassword: yup
				.string()
				.required("Master Password is required!")
				.min(6, "Master Password must be at least 6 characters long!"),
		}),
	});

	const { mutateAsync: createUser } = useCreateUserMutation();

	useEffect(() => {
		if (!isLoading && !user) {
			// Redirect to login page
			router.replace("/api/auth/login");
		}
	}, [user, isLoading]);

	async function handleFormSubmit() {
		if (!user) return;

		const { name, email, picture } = user;

		if (!name || !email || !picture) return;

		const res = await createUser({
			email,
			name,
			profilePicture: picture,
			masterPassword: values.masterPassword,
		});

		if (!res.error) {
			router.replace("/app");
		}
	}

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Just a few more things we need before creating your
						Unopass!
					</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						Hang in there! We&apos;re almost there!
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleFormSubmit();
						}}
					>
						<Stack spacing={4}>
							<FormControl id="password">
								<FormLabel>Master Password</FormLabel>

								<Input
									type="password"
									value={values.masterPassword}
									onChange={(e) => {
										setFieldValue(
											"masterPassword",
											e.target.value
										);
									}}
								/>

								{errors.masterPassword && (
									<Text
										color={"red.500"}
										fontSize={"sm"}
										my={2}
									>
										{errors.masterPassword}
									</Text>
								)}

								<Text color={"gray.400"} fontSize={"sm"} my={2}>
									Warning! This Master Password will be the
									password that unlocks all your passes. You
									can&apos;t change your Master Password. Make
									sure it is secure and you remember it! We
									can&apos;t help you recover it!
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
									Start your Unopass journey!
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
