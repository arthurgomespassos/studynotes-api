import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import userIsBanned from '../middlewares/userIsBanned';
import userController from '../controllers/userController';

const router = new Router();

router.get('/', loginRequired, userIsBanned, userController.show);
router.post('/', userController.store);
router.put('/', loginRequired, userIsBanned, userController.update);

export default router;
