import express from 'express';
import { BookController } from './books.controller';


const router = express.Router();

router.post('/create-book',BookController.createBook)
router.get('/',BookController.getAllBooks)
router.get('/:id',BookController.getSingleBook)
router.patch('/:id',)
router.delete('/:id',)

export const BookRoutes = router;