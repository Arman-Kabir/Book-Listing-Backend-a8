import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";


const createBook = async (data: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data,
        include:{
            category:true
        }
    });
    return result;
};

const getAllBooks = async () => {
    const result = await prisma.book.findMany({
        include:{
            category:true
        }
    });
    return result;
};

const getSingleBook= async (id: string): Promise<Book | null> => {
    const result = await prisma.book.findUnique({
        where: {
            id
        },
        include:{
            category:true
        }
    });
    return result;
};

export const BookService = {
    createBook,
    getAllBooks,
    getSingleBook
}