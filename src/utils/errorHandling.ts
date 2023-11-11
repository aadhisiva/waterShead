import { RESPONSEMSG, RESPONSE_EMPTY_DATA, ResponseCode, ResponseMessages } from "./statusCodes";

export const apiResponse = (res, result) => {
    const {code, message, data} = result;
    if (result instanceof Error) {
        return res.status(code).send(ResponseMessages(ResponseCode.EXCEPTION, (message || RESPONSEMSG.EXCEPTION), RESPONSE_EMPTY_DATA));
    } else if (code == 422) {
        return res.status(code).send(ResponseMessages(ResponseCode.UNPROCESS, (message || RESPONSEMSG.UNPROCESS), RESPONSE_EMPTY_DATA));
    } else if (code == 404) {
        let response = ResponseMessages(ResponseCode.NOTFOUND, (message || RESPONSEMSG.ACCESS_DENIED), RESPONSE_EMPTY_DATA);
         res.status(code).send(response);
    } else if(code == 400){
        return res.status(code).send(ResponseMessages(ResponseCode.VALIDATE, (message || RESPONSEMSG.VALIDATE_FIELDS), RESPONSE_EMPTY_DATA));
    }else {
        if(!data){
            return res.status(200).send(ResponseMessages(ResponseCode.SUCCESS, (message || RESPONSEMSG.RETRIVE_SUCCESS), result));
        }
        return res.status(200).send(ResponseMessages(ResponseCode.SUCCESS, (message || RESPONSEMSG.RETRIVE_SUCCESS), data));
    }
};