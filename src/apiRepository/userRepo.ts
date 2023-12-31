import { Service } from 'typedi';
import { AppDataSource } from '../db/config';
import { loginData } from '../entities';
import { generateRandomString } from '../utils/resuableCode';

@Service()
export class UserRepo {

    async saveLogin(data: loginData) {
        let loginDb = await AppDataSource.getRepository(loginData);
        return await loginDb.save(data);
    };

    async sendOtp(data: loginData) {
        const { Mobile, UserRole } = data;
        let loginDb = await AppDataSource.getRepository(loginData);
        let findData = await loginDb.findOneBy({ Mobile, UserRole });
        if (!findData) return { code: 404 };
        let newData = { ...findData, ...data };
        return await loginDb.save(newData);
    };

    async fetchUser(data: loginData) {
        const { Mobile, UserRole } = data;
        let findData =  await AppDataSource.getRepository(loginData).findOneBy({ Mobile, UserRole });
        if (!findData) return { code: 404 };
        return findData;
    };
    
};