import { Container, Service } from 'typedi';
import express from "express";
import { apiResponse } from '../utils/errorHandling';
import { AdminServices } from '../apiServices/adminServ';
import { webAuthTokenAndVersion } from '../utils/middlewares';

const adminRouter = express.Router()

const adminServices = Container.get(AdminServices);

adminRouter.post('/sendOtp', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.sendOtp(body);
        return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

adminRouter.post('/addUser', webAuthTokenAndVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.addUser(body);
        return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

adminRouter.post('/allUsersData', webAuthTokenAndVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.allUsersData(body);
        return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

adminRouter.post('/assigningData', webAuthTokenAndVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.assigningData(body);
        return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

adminRouter.post('/verifyOtp', webAuthTokenAndVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.verifyOtp(body);
        return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

export {
    adminRouter
};