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
            const travelDId = parseInt(req.body.travelDataId);
            console.log(travelDId)
            if(travelDId==null){
                return new InternalServerErrorResponse("Error in data",["Please revise the data before requesting"]).handleResponse(req,res);
            }else{
                await prisma.travelData.findUnique(
                    {
                        where:{
                            id : travelDId,
                        }
                    }
                ).then((travelD)=>{
                    if(travelD){
                            return new SuccessResponse("Data found", travelD).handleResponse(req,res);
                    }else{
                            return new NotFoundResponse("Data not found", [null, null, null]).handleResponse(req,res);
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