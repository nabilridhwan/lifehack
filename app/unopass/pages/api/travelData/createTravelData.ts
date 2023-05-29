import {
	InternalServerErrorResponse,
	SuccessResponse,
    NotFoundResponse,
    BadRequest
} from "@unopass/responses";
import {PrismaClient} from "@unopass/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function createTravelData(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method=="POST"){
        if(req.body){
            const userEmail = req.body.email;
            const deptTime = req.body.departure_time;
            const arrivalTime = req.body.arrival_time;
            const flightNo = req.body.flight_number;
            const seatNo = req.body.seat_number;
            const gateNo = req.body.gate_number;
            const terminalId = req.body.terminal;
            const airlineId = req.body.airline;
            const rowNo = req.body.row_number;
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
                            const uid = userid.id.toString();
                            prisma.travelData.create({
                                data: {
                                departure_time: deptTime,
                                arrival_time:arrivalTime,
                                flight_number: flightNo,
                                seat_number:seatNo,
                                gate_number:gateNo,
                                terminal:terminalId,
                                airline:airlineId,
                                row_number: rowNo,
                                user:{
                                    connect:{
                                        id:uid
                                    }
                                }
                            }
                            }).then((data1)=>{
                                console.log(data1)
                                return new SuccessResponse("User found", data1).handleResponse(req,res);
                            }).catch((error:any)=>{
                                return new InternalServerErrorResponse("Error in job",["Data error"]).handleResponse(req,res);
                            })
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