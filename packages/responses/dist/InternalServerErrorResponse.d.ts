import BaseResponse from "./BaseResponse";
export default class InternalServerErrorResponse extends BaseResponse {
    constructor(message: string, data: object | any[]);
}
