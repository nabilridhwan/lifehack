import { useMutation } from "@tanstack/react-query";

interface CreateUserMutationInterface {
	profilePicture?: string;
	name: string;
	email: string;
	masterPassword: string;
}

interface BaseSuccessResponseInterface<T> {
	status: number;
	error: boolean;
	message: string;
	data: T;
}

interface CreateUserMutationResponseInterface {
	id: string;
	name: string;
	profile_picture: string;
}

export function useCreateUserMutation() {
	return useMutation<
		BaseSuccessResponseInterface<CreateUserMutationResponseInterface>,
		Error,
		CreateUserMutationInterface
	>(
		["auth", "onboard"],
		async (data: CreateUserMutationInterface) => {
			const { email, name, masterPassword, profilePicture } = data;

			const response = await fetch("/api/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					name,
					masterPassword,
					profilePicture,
				}),
			});

			return response.json();
		},
		{}
	);
}

export function useIfUserNeedsOnboard(email: string) {
	return useMutation<
		BaseSuccessResponseInterface<any>,
		Error,
		{ email: string }
	>(
		["auth", "onboard"],
		async ({ email }) => {
			const response = await fetch(`/api/user/onboard?email=${email}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}).catch((err) => {
				throw err;
			});

			return response.json();
		},
		{}
	);
}
