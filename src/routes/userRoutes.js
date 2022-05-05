import { Router } from 'express';
import userController from '../controllers/userController';

const router = new Router();

// TODO uncomment for testing only
// router.get('/', userController.index);
// router.get('/:id', userController.show);

router.post('/', userController.store);
router.put('/', userController.update);
router.delete('/', userController.remove);

export default router;
