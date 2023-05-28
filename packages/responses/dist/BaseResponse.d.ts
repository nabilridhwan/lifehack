import type { NextApiRequest, NextApiResponse } from "next";
export default class BaseResponse {
    status: number;
    message: string;
    data: object | any[];
    error: boolean;
    constructor(status: number, message: string, data?: object | any[]);
    handleResponse(req: NextApiRequest, res: NextApiResponse): void;
}
