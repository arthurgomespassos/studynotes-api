import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import userController from '../controllers/userController';

const router = new Router();

// uncomment for testing only, not use this in production mode
// router.get('/', userController.index);

router.get('/', loginRequired, userController.show);
router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.remove);

export default router;
