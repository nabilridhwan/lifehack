import BaseResponse from "./BaseResponse";

export default class ForbiddenResponse extends BaseResponse {
	constructor(message: string, data: object | any[]) {
		super(403, message, data);
	}
}
