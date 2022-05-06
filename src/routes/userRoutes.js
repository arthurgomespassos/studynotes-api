import { Router } from 'express';
import userController from '../controllers/userController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// TODO uncomment for testing only
// router.get('/', userController.index);

router.get('/', loginRequired, userController.show);
router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.remove);

export default router;
