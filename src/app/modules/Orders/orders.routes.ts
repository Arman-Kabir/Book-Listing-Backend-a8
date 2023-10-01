import express from 'express';
import { OrderController } from './orders.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post('/create-order', auth(ENUM_USER_ROLE.CUSTOMER), OrderController.createOrder)
router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllOrders)
router.get('/',auth(ENUM_USER_ROLE.CUSTOMER), OrderController.getAllOrders)
router.get('/:orderId', auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN), OrderController.getSingleOrder)


export const OrderRoutes = router;