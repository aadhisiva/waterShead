import { Service } from "typedi";
import { UserRepo } from "../apiRepository/userRepo";
import { generateOTP, generateRandomString } from "../utils/resuableCode";
import { RESPONSEMSG } from "../utils/statusCodes";
import { OtpServices } from "../sms/smsServceResusable";

type ObjectParam = any;

@Service()
export class UserServices {
    constructor(
        public userRepo: UserRepo,
        public otpServices: OtpServices
    ) { };
    async saveLogin(data) {
        const { Mobile, UserRole } = data;
        if (!Mobile || !UserRole) return { code: 400 };
        data.UserId = 'WS' + (String(new Date().getTime()).slice(7));
        return this.userRepo.saveLogin(data);
    };
    
    async sendOtp(data) {
        const { Mobile, UserRole } = data;
        if (!Mobile || !UserRole) return { code: 400 };
        data.Otp = generateOTP(4);
        data.Token = generateRandomString(40);
        let savedRes: ObjectParam = await this.userRepo.sendOtp(data);
        if(!savedRes?.code){
           let sendSingleSms = await this.otpServices.sendOtpAsSingleSms(Mobile, data?.Otp);
            if (sendSingleSms !== 200) return { code: 422, message: RESPONSEMSG.OTP_FAILED };
            return {message: RESPONSEMSG.OTP, data: { Token: savedRes?.Token, Version: savedRes.Version}};
        };
        return savedRes;
    };

    async verifyOtp(data) {
        const { Mobile, UserRole, Otp } = data;
        if (!Mobile || !UserRole) return { code: 400 };
        let loginUser: ObjectParam = await this.userRepo.fetchUser(data);
        if(loginUser?.Otp !== Otp) return {code: 422, message: RESPONSEMSG.VALIDATE_FAILED} 
        return {message: RESPONSEMSG.VALIDATE, data: {}};
    };
}