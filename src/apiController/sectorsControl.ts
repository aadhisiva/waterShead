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

sectorRouter.post('/questions', async (req, res) => {
    try {
        let body = req.body;
        let result = await sectorServices.saveQuestions(body);
         return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

sectorRouter.post('/getQuestions', async (req, res) => {
    try {
        let body = req.body;
        let result = await sectorServices.getQuestions(body);
         return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

export {
    sectorRouter
};