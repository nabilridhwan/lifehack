import {
	InternalServerErrorResponse,
	SuccessResponse,
    NotFoundResponse,
    BadRequest
} from "@unopass/responses";
import {PrismaClient} from "@unopass/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function updateTravelData(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method=="POST"){
        if(req.body){
            const travelDId = parseInt(req.body.travelDataId);
            const uid = req.body.userid;
            const deptTime = req.body.departure_time;
            const arrivalTime = req.body.arrival_time;
            const flightNo = req.body.flight_number;
            const seatNo = req.body.seat_number;
            const gateNo = req.body.gate_number;
            const terminalId = req.body.terminal;
            const airlineId = req.body.airline;
            const rowNo = req.body.row_number;            
            console.log(travelDId)
            if(travelDId==null){
                return new InternalServerErrorResponse("Error in data2",["Please revise the data before requesting"]).handleResponse(req,res);
            }else{
                await prisma.travelData.update(
                    {
                        where:{
                            id : travelDId,
                        },
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
                    }
                ).then((travelD)=>{
                    if(travelD){
                            return new SuccessResponse("Data update", travelD).handleResponse(req,res);
                    }else{
                            return new NotFoundResponse("Error in job", ["Data error"]).handleResponse(req,res);
                    }
                }
                )
            }
        }else{
            return new InternalServerErrorResponse("Error in data1",["Please revise the data before requesting"]).handleResponse(req,res);
        }
    }else{
        return new BadRequest("Bad request sent", ["Only POST requests are allowed"]).handleResponse(req,res);
    }
}