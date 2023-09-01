import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createCategory = async (data: Category): Promise<Category> => {
    const result = await prisma.category.create({
        data
    });
    return result;
};

const getAllCategories = async () => {
    const result = await prisma.category.findMany({});
    return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
    const result = await prisma.category.findUnique({
        where: {
            id
        }
    });
    return result;
};

const updateSingleCategory = async (id: string, payload: Category): Promise<Category | null> => {
    console.log(id,payload);
    const result = await prisma.category.update({
        where: {
            id
        },
        data: payload
    });
    return result;
};

const deleteCategory = async (id: string): Promise<Category | null> => {
    const result = await prisma.category.delete({
        where: {
            id
        }
    });
    return result;
}

export const CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateSingleCategory,
    deleteCategory
}