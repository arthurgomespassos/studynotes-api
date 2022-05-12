import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import userIsBanned from '../middlewares/userIsBanned';
import noteController from '../controllers/noteController';

const router = new Router();

router.get('/', loginRequired, userIsBanned, noteController.index);
router.get('/:note_id', loginRequired, userIsBanned, noteController.show);
router.post('/', loginRequired, userIsBanned, noteController.store);
router.put('/', loginRequired, userIsBanned, noteController.update);
router.delete('/', loginRequired, userIsBanned, noteController.remove);

export default router;
