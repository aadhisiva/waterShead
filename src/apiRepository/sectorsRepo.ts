import { Service } from 'typedi';
import { AppDataSource } from '../db/config';
import { Activity, Category, Schemes, Sectors, SubActivity, SubSchemes } from '../entities';
import { YES } from '../utils/constants';
import { Equal } from 'typeorm';

@Service()
export class SectorRepo {

    async getSchemes(data) {
        const { UserRole } = data;
        if(!UserRole) return { code: 400 };
        let schemesJson = await AppDataSource.getRepository(Schemes).find();
        let promiseRes = await new Promise(async (resolve, reject) => {
            let newArray = [];
            const schemesLength = schemesJson.length;
            for (let i = 0; i < schemesLength; i++) {
                let eachScheme = schemesJson[i];
                eachScheme['SectorsJson'] = [];
                let newObj = {
                    ...eachScheme,
                    SectorsJson: await AppDataSource.getRepository(Sectors).find({ where: { SchemeCode: Equal(eachScheme.SchemeCode), UserRole: Equal(UserRole) } })
                }
                newArray.push(newObj);
            };
            resolve(newArray);
        });
        return promiseRes;
    };

    async codeWiseJsonFormate(data) {
        const { ActivityCode, SubSchemeCode, CategoryCode, SubActivityCode } = data;
        return await new Promise(async (resolve, reject) => {
            if (ActivityCode) {
                let newArray = [];
                let schemesJson = await AppDataSource.getRepository(Activity).find({ where: { ActivityCode: ActivityCode } });
                let schemesLength = schemesJson.length;
                for (let i = 0; i < schemesLength; i++) {
                    schemesJson[i]['SubActivityJson'] = [];
                    if (schemesJson[i].IsSubActivity == YES) {
                        let newObj = {
                            ...schemesJson[i],
                            SubActivityJson: await AppDataSource.getRepository(Activity).find({ where: { ActivityCode: schemesJson[i].SubActivityCode } })
                        }
                        newArray.push(newObj);
                    }
                    newArray.push(schemesJson[i])
                };
                resolve(newArray);
            } else if (SubSchemeCode) {
                let newArray = [];
                let SubSchemesJson = await AppDataSource.getRepository(SubSchemes).find({ where: { SubSchemeCode: SubSchemeCode } });
                let SubSchemesLength = SubSchemesJson.length;
                for (let i = 0; i < SubSchemesLength; i++) {
                    let eachObj = SubSchemesJson[i];
                    eachObj['activityJson'] = [];
                    eachObj['subActivityJson'] = [];
                    let newSubScheme = {
                        ...eachObj,
                        categoryJson: []
                    }
                    // catergory process
                    if (eachObj.IsCategory == YES) {
                        let categoryJson = await AppDataSource.getRepository(Category).find({ where: { CategoryCode: eachObj.CategoryCode } });
                        let categoriesLength = categoryJson.length;
                        for (let j = 0; j < categoriesLength; j++) {
                            let eachCategory = categoryJson[j];
                            eachCategory['subActivityJson'] = [];
                            let newCategory = {
                                ...eachCategory,
                                activityJson: []
                            }
                            // activity process
                            if (eachObj.IsActivity == YES) {
                                let activityJson = await AppDataSource.getRepository(Activity).find({ where: { ActivityCode: eachCategory.ActivityCode } });
                                let activityLength = activityJson.length;
                                for (let k = 0; k < activityLength; k++) {
                                    let eachActivity = activityJson[k];
                                    if (eachActivity.IsSubActivity == YES) {
                                        let newActivityObj = {
                                            ...eachActivity,
                                            SubActivityJson: await AppDataSource.getRepository(SubActivity).find({ where: { SubActivityCode: eachActivity.SubActivityCode } })
                                        }
                                        newCategory.activityJson.push(newActivityObj);
                                    } else {
                                        newCategory.activityJson.push(eachActivity);
                                    }
                                }
                            } else if (eachObj.IsSubActivity == YES) {
                                let SubActivityJson = await AppDataSource.getRepository(SubActivity).find({ where: { SubActivityCode: eachObj.SubActivityCode } });
                                newSubScheme['subActivityJson'].push(SubActivityJson);
                            }
                        }
                        newArray.push(newSubScheme)
                    } else if (eachObj.IsActivity == YES) {
                        let activityJson = await AppDataSource.getRepository(Activity).find({ where: { ActivityCode: eachObj.ActivityCode } });
                        let activityLength = activityJson.length;
                        for (let k = 0; k < activityLength; k++) {
                            let eachActivity = activityJson[k];
                            eachActivity['subActivityJson'] = [];
                            if (eachActivity.IsSubActivity == YES) {
                                let newActivityObj = {
                                    ...eachActivity,
                                    SubActivityJson: await AppDataSource.getRepository(SubActivity).find({ where: { SubActivityCode: eachActivity.SubActivityCode } })
                                }
                                newArray['activityJson'].push(newActivityObj);
                            } else {
                                newArray['activityJson'].push(eachActivity);
                            }
                        }
                    } else if (eachObj.IsSubActivity == YES) {
                        let SubActivityJson = await AppDataSource.getRepository(SubActivity).find({ where: { SubActivityCode: eachObj.SubActivityCode } });
                        newArray['categoryJson'].push([]);
                        newArray['activityJson'].push([]);
                        newArray['subActivityJson'].push(SubActivityJson);
                    }
                }
                resolve(newArray);
            } else if (CategoryCode) {
                let newArray = [];
                let categoryJson = await AppDataSource.getRepository(Category).find({ where: { CategoryCode: CategoryCode } });
                let categoriesLength = categoryJson.length;
                for (let j = 0; j < categoriesLength; j++) {
                    let eachCategory = categoryJson[j];
                    eachCategory['activityJson'] = [];
                    eachCategory['subActivityJson'] = [];
                    let newCategory = {
                        ...eachCategory,
                        activityJson: []
                    };
                    // activity process
                    if (eachCategory.IsActivity == YES) {
                        let activityJson = await AppDataSource.getRepository(Activity).find({ where: { ActivityCode: eachCategory.ActivityCode } });
                        let activityLength = activityJson.length;
                        for (let k = 0; k < activityLength; k++) {
                            let eachActivity = activityJson[k];
                            if (eachActivity.IsSubActivity == YES) {
                                let newActivityObj = {
                                    ...eachActivity,
                                    SubActivityJson: await AppDataSource.getRepository(SubActivity).find({ where: { SubActivityCode: eachActivity.SubActivityCode } })
                                }
                                newCategory.activityJson.push(newActivityObj);
                            } else {
                                newCategory.activityJson.push(eachActivity);
                            }
                        };
                        newArray.push(newCategory);
                    } else if (eachCategory.IsSubActivity == YES) {
                        let SubActivityJson = await AppDataSource.getRepository(SubActivity).find({ where: { SubActivityCode: eachCategory.SubActivityCode } });
                        newCategory['subActivityJson'].push(SubActivityJson);
                    }
                }
                resolve(newArray);
            } else if (SubActivityCode) {
                let newArray = [];
                newArray['categoryJson'].push([]);
                newArray['subSchemeJson'].push([]);
                newArray['activityJson'].push([]);
                let SubActivityJson = await AppDataSource.getRepository(SubActivity).find({ where: { SubActivityCode: SubActivityCode } });
                newArray['subActivityJson'].push(SubActivityJson);
                resolve(newArray);
            }
        })
    };

    async saveShemes(data) {
        return await AppDataSource.getRepository(Schemes).save(data);
    };

    async saveSectors(data) {
        if (data.IsActivity == YES) {
            data.ActivityCode = 'SC' + new Date().getTime();
        } else if (data.IsSubScheme == YES) {
            data.SubSchemeCode = 'SC' + new Date().getTime();
        } else if (data.IsSubActivity == YES) {
            data.SubActivityCode = 'SC' + new Date().getTime();
        } else if (data.IsCategory == YES) {
            data.CategoryCode = 'SC' + new Date().getTime();
        }
        return await AppDataSource.getRepository(Sectors).save(data);
    }
    async saveCategory(data) {
        if (data.IsActivity == YES) {
            data.ActivityCode = 'CA' + new Date().getTime();
        } else if (data.IsSubActivity == YES) {
            data.SubActivityCode = 'CA' + new Date().getTime();
        }
        return await AppDataSource.getRepository(Category).save(data);
    }
    async saveActivity(data) {
        if (data.IsSubActivity == YES) {
            data.SubActivityCode = 'AC' + new Date().getTime();
        }
        data.TypeOfRefractionist = JSON.stringify(data.TypeOfRefractionist);
        data.TypeOfWork = JSON.stringify(data.TypeOfWork)
        return await AppDataSource.getRepository(Activity).save(data);
    }
    async saveSubActivity(data) {
        data.TypeOfRefractionist = JSON.stringify(data.TypeOfRefractionist);
        data.TypeOfWork = JSON.stringify(data.TypeOfWork)
        return await AppDataSource.getRepository(SubActivity).save(data);
    }
}