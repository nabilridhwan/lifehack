// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@unopass/prisma";
import {
	InternalServerErrorResponse,
	SuccessResponse,
} from "@unopass/responses";
import { Encryption, Hash, KeyPairUtils } from "@unopass/token";
import type { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		if (req.method === "POST") {
			const {
				profilePicture,
				name: nameFromBody,
				email,
				masterPassword,
			} = req.body;

			const hashedMasterPassword = await Hash.hash(masterPassword);

			const user = await client.user.create({
				data: {
					name: nameFromBody,
					email,
					master_password: hashedMasterPassword,
					profile_picture: profilePicture,
				},
			});

			const { id, name, profile_picture } = user;

			const keypair = Encryption.generateKeyPair();
			const encryptedKeyPair =
				KeyPairUtils.encryptKeyPairWithMasterPassword(
					keypair,
					masterPassword
				);

			await client.keys.create({
				data: {
					public_key: keypair.public,
					encrypted_private_key: encryptedKeyPair.private,
					user_id: id,
					private_iv: encryptedKeyPair.privateIv,
				},
			});

			const resUser = {
				id,
				name,
				profile_picture,
			};

			return new SuccessResponse(
				"User created successfully!",
				resUser
			).handleResponse(req, res);
		}
	} catch (error: any) {
		return new InternalServerErrorResponse(
			error.message,
			error
		).handleResponse(req, res);
	}
}
