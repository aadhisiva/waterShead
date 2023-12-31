import {Container, Service} from "typedi";
import { SectorRepo } from "../apiRepository/sectorsRepo";
@Service()
export class SectorServices {
    constructor(
        public sectorRepo: SectorRepo
    ){};
    async saveShemes(data){
        return this.sectorRepo.saveShemes(data);
    }
    async getSchemes(data){
        return this.sectorRepo.getSchemes(data);
    }
    async codeWiseJsonFormate(data){
        return this.sectorRepo.codeWiseJsonFormate(data);
    }
    async saveSectors(data){
        return this.sectorRepo.saveSectors(data);
    }
    async saveCategory(data){
        return this.sectorRepo.saveCategory(data);
    }
    async saveActivity(data){
        return this.sectorRepo.saveActivity(data);
    }
    async saveSubActivity(data){
        return this.sectorRepo.saveSubActivity(data);
    }
}