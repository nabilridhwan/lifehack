import BaseResponse from "./BaseResponse";

export default class ConflictResponse extends BaseResponse {
	constructor(message: string, data: object | any[]) {
		super(409, message, data);
	}
}
