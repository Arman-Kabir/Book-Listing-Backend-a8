import { Book, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IBooksFilterRequest } from "./books.interface";
import { booksSearchAbleFileds } from "./books.constants";


const getAllBooks = async (
    filters: IBooksFilterRequest,
    options: IPaginationOptions
) => {
    // console.log(filters, options);
    const { page, size, skip } = paginationHelpers.calculatePagination(options);
    // console.log(page, size, skip);
    const { search,  ...filterData } = filters;
    // category,
    // console.log(search, category, filterData);

    const andConditions = [];
    // 91a9cc82-5989-4ff8-b820-66449dffdc95

    if (search) {
        andConditions.push({
            OR: booksSearchAbleFileds.map((field) =>
            ({
                [field]: {
                    contains: search,
                    mode: 'insensitive'
                }
            }))
        });
    }
    // if (category) {
    //     andConditions.push({
            
    //         categoryId: {
    //             contains: category,
    //             mode: 'insensitive'
    //         }
    //     })
    // }
    // console.log(filterData);
    // console.log(andConditions);

    if (filterData.minPrice && filterData.maxPrice) {
        andConditions.push({
            price: {
                gte: parseFloat(filterData?.minPrice),
                lte: parseFloat(filterData?.maxPrice)
            }
        });
    }

    // console.log(andConditions);

    const whereConditions: Prisma.BookWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.book.findMany({
        include: {
            category: true
        },
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc'
            }

    });
    const total: number = await prisma.book.count({
        where: whereConditions
    })
    const totalPage: number = Math.ceil(total / size) + 1;


    return {
        meta: {
            page,
            size,
            total,
            totalPage
        },
        data: result
    };

};

const getBooksByCategoryId = async (id: string,options:IPaginationOptions) => {
    const { page, size, skip } = paginationHelpers.calculatePagination(options);

    const result = await prisma.book.findMany({
        where: {
            categoryId:id
            // id
        },
        include: {
            category: true
        },
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc'
            }
    });

    const total: number = await prisma.book.count({
        where: {
            categoryId:id
        },
    })
    const totalPage: number = Math.ceil(total / size) + 1;

    return {
        meta: {
            page,
            size,
            total,
            totalPage
        },
        data: result
    };
};






const createBook = async (data: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data,
        include: {
            category: true
        }
    });
    return result;
};


const getSingleBook = async (id: string): Promise<Book | null> => {
    const result = await prisma.book.findUnique({
        where: {
            id
        },
        include: {
            category: true
        }
    });
    return result;
};

const updateSingleBook = async (id: string, payload: Partial<Book>): Promise<Book | null> => {
    console.log(id, payload);
    const result = await prisma.book.update({
        where: {
            id
        },
        data: payload,
        include: {
            category: true
        }
    });
    return result;
};

const deleteBook = async (id: string): Promise<Book | null> => {
    const result = await prisma.book.delete({
        where: {
            id
        },
        include: {
            category: true
        }
    });
    return result;
}

export const BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    getBooksByCategoryId,
    updateSingleBook,
    deleteBook
}