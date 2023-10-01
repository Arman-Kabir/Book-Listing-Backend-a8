import { Order } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
let jwt = require('jsonwebtoken');


const getAllOrders = async (token: string) => {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role } = decoded;
    console.log(decoded);

    if (!userId) {
        throw new ApiError(400, 'userId not exists');
    } else if (role === 'admin') {
        const result = await prisma.order.findMany({});
        return result;
    } else {
        const result = await prisma.order.findMany({
            where: {
                userId
            }
        });
        return result;
    }



};




const createOrder = async (data: Order): Promise<Order | null> => {
    const result = await prisma.order.create({
        data: data as any
    });
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