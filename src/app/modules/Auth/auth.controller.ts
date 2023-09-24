import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.createUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully!",
        data: result
    })
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { refreshToken, ...others } = result;

    // set refresh token into cookie
    const cookieOptions = {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    };

    res.cookie('refreshToken', result.refreshToken, cookieOptions);

    //delete refresh token
    // delete result.refreshToken 
    if ('refreshToken' in result) {
        delete result.refreshToken
    }

    res.send({
        statusCode: httpStatus.OK,
        success: true,
        message: "User signin successfully!",
        token: others.accessToken
    })
});

export const AuthController = {
    createUser,
    loginUser
}