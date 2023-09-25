import {  Order } from "@prisma/client";
import prisma from "../../../shared/prisma";



const createOrder = async (data: Order): Promise<Order> => {
    const result = await prisma.order.create({
        data:data
    });
    return result;
};

const getAllOrders = async () => {
    const result = await prisma.order.findMany({});
    return result;
};

const getSingleOrder = async (id: string): Promise<Order | null> => {
    const result = await prisma.order.findUnique({
        where: {
            id
        }
    });
    return result;
};

export const OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder
}