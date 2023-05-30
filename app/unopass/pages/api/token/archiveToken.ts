import {
	InternalServerErrorResponse,
	SuccessResponse,
    NotFoundResponse,
    BadRequest
} from "@unopass/responses";
import {PrismaClient} from "@unopass/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function archiveTokenFromId(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method=="POST"){
        if(req.body){
            const tokenId = req.body.tokenId;
            console.log(tokenId)
            if(tokenId==null){
                return new InternalServerErrorResponse("Error in data",["Please revise the data before requesting"]).handleResponse(req,res);
            }else{
                try{
                    await prisma.token.update(
                        {
                            where:{
                                id : tokenId,
                            },
                            data:{
                                status:"inactive"
                            }
                        }
                    ).then((data)=>{
                        if(data){
                            return new SuccessResponse("User found", [data.id,data.status]).handleResponse(req,res);
                        }else{
                            return new InternalServerErrorResponse("Error in job",["An error occurred when archiving token."]).handleResponse(req,res);
                        }
                    })
                }catch(error:any){
                    return new NotFoundResponse("Error in data",["Token not found"]).handleResponse(req,res);
                }
                
            }
        }else{
            return new InternalServerErrorResponse("Error in data",["Please revise the data before requesting"]).handleResponse(req,res);
        }
    }else{
        return new BadRequest("Bad request sent", ["Only POST requests are allowed"]).handleResponse(req,res);
    }
}