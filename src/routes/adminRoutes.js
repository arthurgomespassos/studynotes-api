import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import adminRequired from '../middlewares/adminRequired';
import adminController from '../controllers/adminController';

const router = new Router();

router.get('/', loginRequired, adminRequired, adminController.index);
router.delete('/', loginRequired, adminRequired, adminController.ban);
router.post('/', loginRequired, adminRequired, adminController.unban);

export default router;
