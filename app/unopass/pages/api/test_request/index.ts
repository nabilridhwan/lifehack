import {
	InternalServerErrorResponse,
	SuccessResponse,
} from "@unopass/responses";
import {PrismaClient} from "@unopass/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
    req:NextApiRequest,
    res: NextApiResponse
    ) {
    if(req.method=="GET"){
        try{
            const users = await prisma.user.findMany();
            console.log(users.length)
            console.log(users[0])
            return new SuccessResponse("All users", users).handleResponse(req,res);
        }catch(error: any){
            return new InternalServerErrorResponse(
                error.message,
                error
            ).handleResponse(req, res);
        }
    }
}