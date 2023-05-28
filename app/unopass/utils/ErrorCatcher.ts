import { InternalServerErrorResponse } from "@unopass/responses";
import type { NextApiRequest, NextApiResponse } from "next";

export default function withErrorCatcher<T extends () => Promise<void>>(
	fn: T,
	req: NextApiRequest,
	res: NextApiResponse
) {
	fn().catch((error: any) => {
		new InternalServerErrorResponse(error.message, error).handleResponse(
			req,
			res
		);
	});
}
