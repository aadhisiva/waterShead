import { Activity, Category, Schemes, Sectors, SubActivity, SubSchemes, loginData, masterData, mobileLogs, superAdmin, webLogs } from "../entities"
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
        versions,
        masterData,
        webLogs,
        mobileLogs,
        superAdmin
    ]
}