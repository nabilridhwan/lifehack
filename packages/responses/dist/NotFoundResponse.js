"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResponse_1 = __importDefault(require("./BaseResponse"));
class NotFoundResponse extends BaseResponse_1.default {
    constructor(message, data) {
        super(404, message, data);
    }
}
exports.default = NotFoundResponse;
//# sourceMappingURL=NotFoundResponse.js.map