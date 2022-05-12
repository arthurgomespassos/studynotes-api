import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import userIsBanned from '../middlewares/userIsBanned';
import partController from '../controllers/partController';

const router = new Router();

router.get('/', loginRequired, userIsBanned, partController.index);
router.post('/', loginRequired, userIsBanned, partController.store);
router.put('/', loginRequired, userIsBanned, partController.update);
router.delete('/', loginRequired, userIsBanned, partController.remove);

export default router;
