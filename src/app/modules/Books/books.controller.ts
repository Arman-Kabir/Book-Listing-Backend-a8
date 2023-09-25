import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./books.service";
import pick from "../../../shared/pick";
import { booksFilterAbleFields } from "./books.constants";


export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.query);

    const filters = pick(req.query,booksFilterAbleFields);

    const options = pick(req.query,['page','size','sortBy','sortOrder']);

    // console.log(filters,options);

    const result = await BookService.getAllBooks(filters,options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "books fetched Successfully",
        data: result
    })
});


export const createBook = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.createBook(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book created successfully",
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

export const updateSingleBook = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.updateSingleBook(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single Book Updated Successfully",
        data: result
    })
});

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.deleteBook(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book deleted Successfully",
        data: result
    })
});


export const BookController = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateSingleBook,
    deleteBook
}