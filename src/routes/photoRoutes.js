import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import userIsBanned from '../middlewares/userIsBanned';
import photoController from '../controllers/photoController';

const router = new Router();

router.get('/:part_id', loginRequired, userIsBanned, photoController.show);
router.post('/:part_id', loginRequired, userIsBanned, photoController.store);
router.delete('/:part_id', loginRequired, userIsBanned, photoController.remove);

export default router;
