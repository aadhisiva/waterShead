import { Container, Service } from 'typedi';
import express from "express";
import { apiResponse } from '../utils/errorHandling';
import { UserServices } from '../apiServices/userServ';

const userRouter = express.Router()

const userServices = Container.get(UserServices);

userRouter.post('/saveLogin', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.saveLogin(body);
        return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

userRouter.post('/sendOtp', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.sendOtp(body);
        return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

userRouter.post('/verifyOtp', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.verifyOtp(body);
        return apiResponse(res, result);
    } catch (error) {
        return apiResponse(res, error);
    }
});

export {
    userRouter
};