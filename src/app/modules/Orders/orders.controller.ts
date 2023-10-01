import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { OrderService } from "./orders.service";

export const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const result = await OrderService.getAllOrders(token!);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order fetched Successfully",
        data: result
    })
});



export const createOrder = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await OrderService.createOrder(data);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order created successfully",
        data: result
    })
});



export const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const result = await OrderService.getSingleOrder(req.params.orderId,token!);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single order fetched Successfully",
        data: result
    })
});

export const OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder
}