import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ILoginPayload from "./profile.interface";
import ApiError from "../../../errors/ApiError";
import { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

// eslint-disable-next-line @typescript-eslint/no-var-requires
let jwt = require('jsonwebtoken');

const getProfile = async (token:string)  => {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const {userId,role} = decoded;
    console.log(decoded);

    if(!userId){
        throw new ApiError(400,'userId not exists');
    }else if(role !== 'customer' && role !=='admin'){
        throw new ApiError(403,'Access Forbidden');
    }
    
    const result = await prisma.user.findUnique({
        where: {
            id:userId
        }
    });
    return result;
};



export const ProfileService = {
  getProfile
}