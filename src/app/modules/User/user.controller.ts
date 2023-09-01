import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched Successfully",
        data: result
    })
});

export const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getSingleUser(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single User fetched Successfully",
        data: result
    })
});

export const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.updateSingleUser(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single User Updated Successfully",
        data: result
    })
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.deleteUser(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User deleted Successfully",
        data: result
    })
});

export const UserController = {
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser
}