import express from 'express';
import { BookController } from './books.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';


const router = express.Router();

router.post('/create-book', BookController.createBook)
router.get('/', BookController.getAllBooks)
router.get('/:id', BookController.getSingleBook)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateSingleBook)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook)

export const BookRoutes = router;