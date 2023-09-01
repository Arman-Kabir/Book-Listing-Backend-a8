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
        message: "Category created successfully",
        data: result
    })
});

export const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "categories fetched Successfully",
        data: result
    })
});

export const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.getSingleCategory(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single Category fetched Successfully",
        data: result
    })
});



export const CategoryController = {
    createCategory,
    getAllCategories,
    getSingleCategory
}