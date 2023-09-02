import express from 'express';
import { BookController } from './books.controller';


const router = express.Router();

router.post('/create-book',BookController.createBook)
router.get('/',BookController.getAllBooks)
router.get('/:id',BookController.getSingleBook)
router.patch('/:id',BookController.updateSingleBook)
router.delete('/:id',BookController.deleteBook)

export const BookRoutes = router;