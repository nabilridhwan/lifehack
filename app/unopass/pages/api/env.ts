// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
	InternalServerErrorResponse,
	SuccessResponse,
} from "@unopass/responses";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		if (req.method === "GET") {
			return new SuccessResponse(
				"Environement variables",
				process.env
			).handleResponse(req, res);
		}
	} catch (error: any) {
		return new InternalServerErrorResponse(
			error.message,
			error
		).handleResponse(req, res);
	}
}
