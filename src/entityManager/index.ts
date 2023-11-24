import { Activity, Category, Schemes, Sectors, SubActivity, SubSchemes, loginData } from "../entities"
import { formats } from "../entities/formats"
import { versions } from "../entities/versions"


export const entities = () => {
    return [
        Schemes,
        Sectors,
        Category,
        Activity,
        SubActivity,
        SubSchemes,
        loginData,
        formats,
        versions
    ]
}