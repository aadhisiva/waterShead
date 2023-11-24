import { Service } from "typedi";
import { AdminRepo } from "../apiRepository/AdminRepo";
import { generateEOfTTime, generateOTP, generateRandomString, generateUniqueId } from "../utils/resuableCode";
import { RESPONSEMSG } from "../utils/statusCodes";
import { OtpServices } from "../sms/smsServceResusable";
import { loginData } from "../entities";

type ObjectParam = any;

@Service()
export class AdminServices {
    constructor(
        public adminRepo: AdminRepo,
        public otpServices: OtpServices
    ) { };

    async addUser(data) {
        const { Mobile, UserRole } = data;
        if (!Mobile || !UserRole) return { code: 400 };
        let checkMobile = await this.adminRepo.checkWithMobile(Mobile);
        if(checkMobile) return {code: 422, message: "Already Registered"}
        data.UserId = 'WS' + generateUniqueId();
        return this.adminRepo.addUser(data);
    };

    async allUsersData(data) {
        return this.adminRepo.allUsersData(data);
    };

    async assigningData(data) {
        if(!data?.UserId) return {code: 400};
        return this.adminRepo.assigningData(data);
    };

    async sendOtp(data: loginData) {
        const { Mobile, UserRole } = data;
        if (!Mobile || !UserRole) return { code: 400 };
        let version = await this.adminRepo.getVersionOfApp();
        data.WebOtp = generateOTP(4);
        data.WebToken = generateRandomString(40);
        data.WebVersion = version[0]?.WebVersion;
        data.WebTokenExpirationTime = generateEOfTTime();
        let savedRes: ObjectParam = await this.adminRepo.sendOtp(data);
        if (!savedRes?.code) {
            let sendSingleSms = await this.otpServices.sendOtpAsSingleSms(Mobile, data?.WebOtp);
            if (sendSingleSms !== 200) return { code: 422, message: RESPONSEMSG.OTP_FAILED };
            return { message: RESPONSEMSG.OTP, data: { Token: savedRes?.WebToken, UserId: savedRes?.UserId, Version: savedRes?.WebVersion } };
        };
        return savedRes;
    };

    async verifyOtp(data) {
        const { Mobile, UserRole, Otp } = data;
        if (!Mobile || !UserRole) return { code: 400 };
        let loginUser: ObjectParam = await this.adminRepo.fetchUser(data);
        if (loginUser?.WebOtp !== Otp) return { code: 422, message: RESPONSEMSG.VALIDATE_FAILED }
        return { message: RESPONSEMSG.VALIDATE, data: {} };
    };
}