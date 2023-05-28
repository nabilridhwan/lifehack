// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
	InternalServerErrorResponse,
	NotFoundResponse,
} from "@unopass/responses";
import type { NextApiRequest, NextApiResponse } from "next";

// Prisma Client
import { PrismaClient } from "@unopass/prisma";

const client = new PrismaClient();

type Data = {
	name: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		if (req.method === "GET") {
			const user = await client.user.findFirst({
				where: {
					email: req.query.email as string,
				},
			});

			if (!user) {
				return new NotFoundResponse(
					"User not found",
					{}
				).handleResponse(req, res);
			}
		}
	} catch (error: any) {
		return new InternalServerErrorResponse(
			error.message,
			error
		).handleResponse(req, res);
	}
}
