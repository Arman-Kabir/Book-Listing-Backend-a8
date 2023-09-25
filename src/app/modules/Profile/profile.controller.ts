import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ProfileService } from "./profile.service";

export const getProfile = catchAsync(async (req: Request, res: Response) => {

    const token = req.headers.authorization;
    // console.log(token);
    const result = await ProfileService.getProfile(token!);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile data",
        data: result
    })
});

export const ProfileController = {
    getProfile
}