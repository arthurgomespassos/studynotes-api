import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import noteController from '../controllers/noteController';

const router = new Router();

router.get('/', loginRequired, noteController.index);
router.get('/:note_id', loginRequired, noteController.show);
router.post('/', loginRequired, noteController.store);
router.put('/', loginRequired, noteController.update);
router.delete('/', loginRequired, noteController.remove);

export default router;
