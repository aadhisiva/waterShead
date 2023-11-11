import { Activity, Category, Schemes, Sectors, SubActivity, SubSchemes, loginData } from "../entities"


export const entities = () => {
    return [
        Schemes,
        Sectors,
        Category,
        Activity,
        SubActivity,
        SubSchemes,
        loginData
    ]
}