import express from 'express';
import productsRoute from './products';

const router = express.Router();

router.get('/products', productsRoute);
router.get('/', (req, res) => res.send('Hello World'));

export default router;
