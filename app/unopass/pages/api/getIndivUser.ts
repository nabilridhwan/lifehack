import {
	InternalServerErrorResponse,
	SuccessResponse,
    NotFoundResponse,
    BadRequest
} from "@unopass/responses";
import {PrismaClient} from "@unopass/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getUserByEmail(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method=="POST"){
        if(req.body){
            const userEmail = req.body.email;
            console.log(userEmail)
            if(userEmail==null){
                return new InternalServerErrorResponse("Error in data",["Please revise the data before requesting"]).handleResponse(req,res);
            }else{
                await prisma.user.findUnique(
                    {
                        where:{
                            email : userEmail,
                        },
                        select:{
                            name: true,
                            email: true,
                            profile_picture: true
                        }
                    }
                ).then((userData)=>{
                    if(userData){
                            return new SuccessResponse("User found", userData).handleResponse(req,res);
                    }else{
                            return new NotFoundResponse("User not found", [null, null, null]).handleResponse(req,res);
                    }
                }
                )
            }
        }else{
            return new InternalServerErrorResponse("Error in data",["Please revise the data before requesting"]).handleResponse(req,res);
        }
    }else{
        return new BadRequest("Bad request sent", ["Only POST requests are allowed"]).handleResponse(req,res);
    }
}