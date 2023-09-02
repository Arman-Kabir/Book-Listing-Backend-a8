import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./books.service";



export const createBook = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.createBook(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book created successfully",
        data: result
    })
});

export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.getAllBooks();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "books fetched Successfully",
        data: result
    })
});

export const getSingleBook = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.getSingleBook(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single Book fetched Successfully",
        data: result
    })
});


export const BookController = {
    createBook,
    getAllBooks,
    getSingleBook
}