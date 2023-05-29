import {
	InternalServerErrorResponse,
	SuccessResponse,
    NotFoundResponse,
    BadRequest
} from "@unopass/responses";
import {PrismaClient} from "@unopass/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getToken(
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
                            id: true
                        }
                    }
                ).then((userid)=>{
                    if(userid){
                        prisma.token.findMany(
                            {
                                where:{
                                    user_id: userid.id,
                                    status: "active"
                                }
                            }
                        ).then((tokenDetails)=>{
                            if(tokenDetails){
                                    return new SuccessResponse("Token found", tokenDetails).handleResponse(req,res);
                            }else{
                                    return new NotFoundResponse("User not found", [null]).handleResponse(req,res);
                            }
                        }
                        )
                    }else{
                        return new NotFoundResponse("User not found", [null]).handleResponse(req,res);
                    }
                    
                })
                
                
            }
        }else{
            return new InternalServerErrorResponse("Error in data",["Please revise the data before requesting"]).handleResponse(req,res);
        }
    }else{
        return new BadRequest("Bad request sent", ["Only POST requests are allowed"]).handleResponse(req,res);
    }
}