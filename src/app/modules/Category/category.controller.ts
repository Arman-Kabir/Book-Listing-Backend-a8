import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CategoryService } from "./category.service";


export const createCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.createCategory(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category created",
        data: result
    })
});



export const CategoryController = {
    createCategory
}