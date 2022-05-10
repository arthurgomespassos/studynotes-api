import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import photoController from '../controllers/photoController';

const router = new Router();

router.get('/:part_id', loginRequired, photoController.show);
router.post('/:part_id', loginRequired, photoController.store);
router.delete('/:part_id', loginRequired, photoController.remove);

export default router;
