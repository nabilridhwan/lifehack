import BaseResponse from "./BaseResponse";
export default class UnauthorizedResponse extends BaseResponse {
    constructor(message: string, data: object | any[]);
}
