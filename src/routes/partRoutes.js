import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import partController from '../controllers/partController';

const router = new Router();

router.get('/', loginRequired, partController.index);
router.post('/', loginRequired, partController.store);
router.put('/', loginRequired, partController.update);
router.delete('/', loginRequired, partController.remove);

export default router;
