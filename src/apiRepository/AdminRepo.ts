import { Service } from 'typedi';
import { AppDataSource } from '../db/config';
import { loginData, versions } from '../entities';

@Service()
export class AdminRepo {

    async addUser(data: loginData) {
        return await AppDataSource.getRepository(loginData).save(data);
    };

    async checkWithMobile(Mobile) {
        return await AppDataSource.getRepository(loginData).findOneBy({Mobile});
    };

    async allUsersData(data) {
        const {skip, take} = data;
        return await AppDataSource.getRepository(loginData)
            .createQueryBuilder('user').select(["user.UserRole as UserRole","user.Name as Name","user.UserId as UserId","user.Mobile as Mobile","user.DistrictCode as DistrictCode",
                "user.TalukCode as TalukCode","user.HobliCode as HobliCode","user.Status as Status",
                "user.Allotted as Allotted", "user.Assignment as Assignment"])
            .skip(skip)
            .take(take)
            .getRawMany();
    };

    async assigningData(data) {
        let userAssign = await AppDataSource.getRepository(loginData);
        let find = await userAssign.findOneBy({UserId: data?.UserId});
        if (!find) return { code: 404 };
        let newData = {...find, ...data};
        return await userAssign.save(newData);
    };

    async getVersionOfApp() {
        return await AppDataSource.getRepository(versions).find();
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