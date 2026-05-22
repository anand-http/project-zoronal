import express from 'express';
import { getReviewsByCompany, addReview } from '../controllers/ReviewController.js';

const router = express.Router();


router.get('/get-reviews/:id',getReviewsByCompany);
router.post('/add-review/:id',addReview);


export default router;