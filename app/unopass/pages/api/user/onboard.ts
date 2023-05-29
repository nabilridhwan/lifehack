// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@unopass/prisma";
import {
	InternalServerErrorResponse,
	NotFoundResponse,
	SuccessResponse,
} from "@unopass/responses";
import type { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		if (req.method === "GET") {
			const { email } = req.query;

			const e = email as string;

			const user = await client.user.findFirst({
				where: {
					email: e,
				},
			});

			if (!user) {
				return new NotFoundResponse(
					"User not found!",
					{}
				).handleResponse(req, res);
			}

			return new SuccessResponse("User found!", user).handleResponse(
				req,
				res
			);
		}
	} catch (error: any) {
		return new InternalServerErrorResponse(
			error.message,
			error
		).handleResponse(req, res);
	}
}
