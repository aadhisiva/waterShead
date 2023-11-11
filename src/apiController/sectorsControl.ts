import { Container, Service } from 'typedi';
import express from "express";
import { SectorServices } from '../apiServices/sectorsServ';
import { apiResponse } from '../utils/errorHandling';

const sectorRouter = express.Router()

const sectorServices = Container.get(SectorServices);

sectorRouter.post('/getSchemes', async (req, res) => {
    try {
        let body = req.body;
        let result = await sectorServices.getSchemes(body);
        return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error) ;
    }
});

sectorRouter.post('/codeWiseJsonFormate', async (req, res) => {
    try {
        let body = req.body;
        let result = await sectorServices.codeWiseJsonFormate(body);
         return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

sectorRouter.post('/schemes', async (req, res) => {
    try {
        let body = req.body;
        let result = await sectorServices.saveShemes(body);
         return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

sectorRouter.post('/sectors', async (req, res) => {
    try {
        let body = req.body;
        let result = await sectorServices.saveSectors(body);
         return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});
sectorRouter.post('/category', async (req, res) => {
    try {
        let body = req.body;
        let result = await sectorServices.saveCategory(body);
         return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});
sectorRouter.post('/category', async (req, res) => {
    try {
        let body = req.body;
        let result = await sectorServices.saveCategory(body);
         return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});
sectorRouter.post('/activity', async (req, res) => {
    try {
        let body = req.body;
        let result = await sectorServices.saveActivity(body);
         return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});
sectorRouter.post('/subActivity', async (req, res) => {
    try {
        let body = req.body;
        let result = await sectorServices.saveSubActivity(body);
         return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});
sectorRouter.post('/random', async (req, res) => {
    try {
        let newArray = [];
        for(let i=1; i < 15000; i++){
            if(i < 10){
                newArray.push(String(new Date().getTime()).slice(0,9)+i) 
            } else if(i > 10 && i < 100){
                newArray.push(String(new Date().getTime()).slice(0,8)+i) 
            } else if(i > 100 && i < 1000){
                newArray.push(String(new Date().getTime()).slice(0,7)+i) 
            } else if(i > 1000 && i < 15000){
                newArray.push(String(new Date().getTime()).slice(0,5)+(i)) 
            } 
        }
        return apiResponse(res, newArray);
    } catch (error) {
        return apiResponse(res, error);
    }
});

export {
    sectorRouter
};