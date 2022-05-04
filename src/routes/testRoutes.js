import { Router } from 'express';
import testController from '../controllers/testController';

const router = Router();

router.get('/', testController.test);

export default router;
