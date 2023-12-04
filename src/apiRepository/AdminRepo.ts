import { Service } from 'typedi';
import { AppDataSource } from '../db/config';
import { Schemes, loginData, masterData, superAdmin, versions } from '../entities';
import { SUPER_ADMIN } from '../utils/constants';


let superAdminRepo = AppDataSource.getRepository(superAdmin);
let loginDataRepo = AppDataSource.getRepository(loginData);
let schemesRepo = AppDataSource.getRepository(Schemes);
let versionRepo = AppDataSource.getRepository(versions);
let mastersRepo = AppDataSource.getRepository(masterData);

@Service()
export class AdminRepo {

    async addUser(data: loginData) {
        return await loginDataRepo.save(data);
    };

    async addSuperAdmin(data: loginData) {
        return await superAdminRepo.save(data);
    };

    async checkWithMobile(Mobile) {
        return await loginDataRepo.findOneBy({ Mobile });
    };

    async allUsersData(data) {
        const { skip, take } = data;
        let getData = await loginDataRepo
            .createQueryBuilder('user').select(["user.UserRole as UserRole", "user.Name as Name", "user.UserId as UserId", "user.Mobile as Mobile", "user.DistrictCode as DistrictCode",
                "user.TalukCode as TalukCode", "user.HobliCode as HobliCode", "user.Status as Status",
                "user.Allotted as Allotted", "user.Assignment as Assignment", "user.DistrictName as DistrictName",
                "user.TalukName as TalukName", "user.HobliName as HobliName"])
            .skip(skip)
            .take(take)
            .getRawMany();
        let count = await loginDataRepo.count();
        return [getData, count]
    };

    async assigningData(data) {
        let userAssign = await loginDataRepo;
        let find = await userAssign.findOneBy({ UserId: data?.UserId });
        if (!find) return { code: 404 };
        let newData = { ...find, ...data };
        return await userAssign.save(newData);
    };

    async getVersionOfApp() {
        return await versionRepo.find();
    };

    async sendOtp(data: loginData) {
        const { Mobile, UserRole } = data;
        if (UserRole == SUPER_ADMIN) {
            let findData = await superAdminRepo.findOneBy({ Mobile, UserRole });
            if (!findData) return { code: 404 };
            let newData = { ...findData, ...data };
            return await superAdminRepo.save(newData);
        } else {
            let loginDb = await loginDataRepo;
            let findData = await loginDb.findOneBy({ Mobile, UserRole });
            if (!findData) return { code: 404 };
            let newData = { ...findData, ...data };
            return await loginDb.save(newData);
        }
    };

    async fetchUser(data: loginData) {
        const { Mobile, UserRole } = data;
        if (UserRole == SUPER_ADMIN) {
            let findData = await superAdminRepo.findOneBy({ Mobile, UserRole });
            if (!findData) return { code: 404 };
            return findData;
        } else {
            let findData = await loginDataRepo.findOneBy({ Mobile, UserRole });
            if (!findData) return { code: 404 };
            return findData;
        }
    };

    async getSchemes(data: loginData) {
        let findData = await schemesRepo.find();
        return findData;
    };

    async allDistricts(data: masterData) {
        let findData = await mastersRepo.createQueryBuilder('master').select(['DISTINCT master.DistrictCode as value', 'master.DistrictName as name'])
            .orderBy('master.DistrictCode', 'ASC').getRawMany();
        return findData;
    };

    async districtWiseTaluk(data) {
        if (!data?.code) return { code: 400 };
        let findData = await mastersRepo.createQueryBuilder('master')
            .select(['DISTINCT master.TalukCode as value', 'master.TalukName as name'])
            .where("master.DistrictCode = :dCode", { dCode: data?.code })
            .orderBy('master.TalukCode', 'ASC')
            .getRawMany();
        return findData;
    };

    async talukWiseHobli(data) {
        if (!data?.code) return { code: 400 };
        let findData = await mastersRepo.createQueryBuilder('master').select(['DISTINCT master.HobliCode as value', 'master.HobliName as name'])
            .where("master.TalukCode = :dCode", { dCode: data?.code })
            .orderBy('master.HobliCode', 'ASC').getRawMany();
        return findData;
    };

    async subWaterSheadInHobli(data) {
        if (!data?.code) return { code: 400 };
        let findData = await mastersRepo.createQueryBuilder('master').select(['DISTINCT master.SubWatershedCode as value', 'master.SubWatershedName as name'])
            .where("master.HobliCode = :dCode", { dCode: data?.code })
            .orderBy('master.SubWatershedCode', 'ASC').getRawMany();
        return findData;
    };

    async microWaterShedInSubWaterShed(data) {
        if (!data?.code) return { code: 400 };
        let findData = await mastersRepo.createQueryBuilder('master').select(['DISTINCT master.MicroWatershedCode as value', 'master.MicroWatershedName as name'])
            .where("master.SubWatershedCode = :dCode", { dCode: data?.code })
            .orderBy('master.MicroWatershedCode', 'ASC').getRawMany();
        return findData;
    };

    async locations(data) {
        const { UserId, Mobile, UserRole } = data;
        let findAll = await loginDataRepo.findBy({ Mobile, UserRole });
        let newArray = [];
        if (UserRole == 'AO') {
            let totalLength = findAll.length;
            for (let i = 0; i < totalLength; i++) {
                let newObject = {};
                let eachIndex = findAll[i];
                newObject['District'] = eachIndex.DistrictName;
                newObject['Taluk'] = eachIndex.TalukName;
                newObject['Hobli'] = eachIndex.HobliName;
                newObject['villages'] = await mastersRepo.createQueryBuilder('master').select(['DISTINCT master.KGISVillageName as village'])
                    .where("master.HobliName = :dCode", { dCode: eachIndex.HobliName })
                    .orderBy('master.KGISVillageName', 'ASC')
                    .getRawMany();
                newObject['subWaterShead'] = await mastersRepo.createQueryBuilder('master').select(['DISTINCT master.SubWatershedName as subWaterShead'])
                    .where("master.HobliName = :dCode", { dCode: eachIndex.HobliName })
                    .orderBy('master.SubWatershedName', 'ASC').getRawMany();
                newArray.push(newObject);
            }
            return newArray;
        } else {
            let totalLength = findAll.length;
            for (let i = 0; i < totalLength; i++) {
                let newObject = {};
                let eachIndex = findAll[i];
                newObject['District'] = eachIndex.DistrictName;
                newObject['Taluk'] = eachIndex.TalukName;
                newObject['villages'] = await mastersRepo.createQueryBuilder('master').select(['DISTINCT master.KGISVillageName as village'])
                    .where("master.TalukName = :dCode", { dCode: eachIndex.TalukName })
                    .orderBy('master.KGISVillageName', 'ASC').getRawMany();
                newObject['subWaterShead'] = await mastersRepo.createQueryBuilder('master').select(['DISTINCT master.SubWatershedName as subWaterShead'])
                    .where("master.TalukName = :dCode", { dCode: eachIndex.TalukName })
                    .orderBy('master.SubWatershedName', 'ASC').getRawMany();
                newArray.push(newObject);
            }
            return newArray;
        }
    };
};