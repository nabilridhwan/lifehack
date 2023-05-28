import BaseResponse from "./BaseResponse";

export default class UnauthorizedResponse extends BaseResponse {
	constructor(message: string, data: object | any[]) {
		super(401, message, data);
	}
}
